# Bug Reports for Upstream

The following bugs were observed in `@objectif-lune/connect-rest-client@1.0.1` (and its dependency `@objectif-lune/core@1.0.1`) running against OL Connect 2024.2.3 (build 23676). Each was reproducible in production and required a fix to ship the system.

This document is intended for the upstream maintainers (Upland Software / Objectif Lune team).

---

## Bug 1 — `OutputCreationService.createOutputFromJobSet`: `createOnly` ternary inverted

**File**: `dist/rest/services/OutputCreationService.js`

**Symptom**: When called with `options.createOnly = false`, the lib resolves the operation by calling `fetchOperationResult` (which returns undefined). When called with `createOnly = true`, it calls `fetchOperationResultAsFolderAndFilenames` (which returns `{identifier, files: [...]}`). The two branches are swapped.

**Effect**: Caller passing `createOnly: false` (= asking for managed-file metadata) gets `undefined` instead. Caller passing `createOnly: true` (= asking for raw file output) gets file metadata instead. We saw this as `managedFileId = 0` being returned consistently and a downstream "Resource not found" error in `olc.downloadOutput`.

**Repro**: In a test against any 2024.2+ server with a JobSet ready for output:
```ts
const op = client.outputCreation.createOutputFromJobSet(presetId, jobSetId, undefined, { createOnly: false });
const result = await op;
// Expected: { identifier: <managedFileId>, files: [...] }
// Actual:   undefined
```

**Patch**: swap the branches of the ternary on the line constructing the result-resolver callback.

---

## Bug 2 — `DocumentEntityService.fetchDocumentMetadata`: missing `/metadata` path segment

**File**: `dist/rest/services/DocumentEntityService.js`

**Symptom**: `fetchDocumentMetadata(docId)` issues `GET /entity/documents/{docId}` instead of the documented `GET /entity/documents/{docId}/metadata`. Server responds with 404 (or returns the document object without metadata, depending on version).

**Effect**: `fetchDocumentMetadata` rejects with `ResourceNotFound`. `readPrintJobs`-style cascades that try to enumerate document metadata across a JobSet are unable to read any per-document properties.

**Repro**:
```ts
await client.documentEntity.fetchDocumentMetadata(someValidDocId);
// throws ResourceNotFound
```

**Patch**: append `"metadata"` as an additional path segment in the call to `fetchProperties`.

---

## Bug 3 — `DocumentSetEntityService.fetchDocumentSetMetadata`: same `/metadata` suffix issue

**File**: `dist/rest/services/DocumentSetEntityService.js`

**Symptom & Effect**: Identical pattern to Bug 2, for document-set metadata reads and updates. Same fix.

---

## Bug 4 — `OLConnectRestClient.getProgressOfOperation`: HTTP 404 treated as fatal

**File**: `dist/api/OLConnectRestClient.js`

**Symptom**: `getProgressOfOperation` registers only an HTTP 200 response handler. When the server has finished the operation and removed it from the active-operations list (returning HTTP 404 on subsequent `getProgress` polls), the lib's polling loop in `ProgressingConnectOperation.waitForDone` catches the resulting `ServerStatusCodeNotExpected` exception and rejects the entire operation Promise.

**Effect**: Long-running operations (e.g. `outputCreation` with 1000+ documents — total wall-clock time ~7 minutes against a fast server) are killed AFTER they actually completed successfully. The lib never reaches the `resultCall` (`getManagedResult`) chain, so the result is lost. We worked around this by adding a 404 response handler that returns `"done"`, which allows the existing waitForDone-then-resultCall chain to proceed correctly. Server then returns the actual managed-file via `getManagedResult` (which DOES still resolve correctly post-completion).

**Repro**: Trigger any sufficiently long-running operation. Once the server marks it complete and removes from the active list, the next `getProgress` poll fails the operation.

**Patch**:
```js
responseHandlers: {
  [HttpResponseCodes.OK]: OKHandler,
  [HttpResponseCodes.NOT_FOUND]: { handler: () => Promise.resolve('done') }
}
```

**Server-side fix would be better**: keep the operation in the active-list with `body: "done"` until `getManagedResult` is called for it (or for a grace period), so getProgress always returns 200.

---

## Bug 5 — `OLConnectRestClient.getProgressOfOperation`: response body invisible in logs

**File**: `dist/api/OLConnectRestClient.js`

**Severity**: cosmetic / diagnostic-only

**Symptom**: The standard request logger writes lines like:
```
261268721 GET .../getProgress/{opId}
261268721 200 OK text/plain 2 bytes
```

But the actual body content (e.g. `"79"`, the percentage) is not in the log. For debugging, knowing whether progress is changing or stuck requires extra plumbing.

**Patch**: log the response body in the OK handler. Trivial; should be opt-in or at debug level.

---

## Bug 6 — `flattenNameValueList` (in `@objectif-lune/core`): destructive type-coercion

**File**: `dist/utilities/connect/conversions/flattenNameValueList.js`

**Severity**: HIGH — silent data corruption

**Symptom**: The function converts the API's response array `[{name, value}, ...]` into a flat `{name: value, ...}` object, but applies regex-based smart-parsing on each value:

```js
result[name] = DATEFORMAT.test(v)
  ? new Date(Date.parse(v))
  : FLOATFORMAT.test(v)
    ? Number.parseFloat(v)
    : INTEGERFORMAT.test(v)
      ? Number.parseInt(v)
      : v;
```

**Effect**:
- **44-character DMC barcode codes** (e.g. `dmcLetterId = "75680215109480502128894393157810200000000000"`) match `INTEGERFORMAT = /^\d+$/`, are passed to `Number.parseInt`, exceed `Number.MAX_SAFE_INTEGER` (~16 digits), and are returned as IEEE-754 floating-point approximations — silent data loss
- **Padded numeric IDs** like `"00000000"` (zero-padded return-address IDs) become `Number(0)`, losing all leading zeros
- **Sequence numbers** like `"021246535"` become `Number(21246535)`, losing the leading zero
- **API-spec violation**: the documented type for the `value` field is `string` ([cookbook](https://help.uplandsoftware.com/objectiflune/en/olconnect-api/2025.2/Cookbook/REST_API_Reference/...)). Coercion is not in the spec.

**Repro**: Any document whose template generates a `dmcLetterId` or any zero-padded numeric ID:
```ts
const meta = await client.documentEntity.fetchDocumentMetadata(docId);
console.log(typeof meta.dmcLetterId, meta.dmcLetterId);
// Expected: 'string' '75680215109480502128894393157810200000000000'
// Actual:   'number'  7.5680215109480503e+43   ← precision lost
```

Consumer code expecting `typeof meta.dmcLetterId === 'string'` then sees `false` and treats the field as missing.

**Suggested upstream fix**:
- Option A (minimal): pass through values untouched. Per API spec, `value` is always string; let consumers convert.
- Option B (safe coercion): coerce `INTEGERFORMAT`-matched values only when `v.length <= 15` (within MAX_SAFE_INTEGER range) AND they don't have leading zeros (`!v.startsWith('0')` for non-`'0'` values).
- Option C (schema-driven): expose a per-property type schema and coerce only when the consumer explicitly opts in.

This patch chose Option A — fewer surprises, fewer assumptions about consumer intent.

---

## Contact

Issues filed in this fork repo can be re-filed against the upstream package by the OL/Upland team if useful. We have no upstream issue tracker access (the documented Bitbucket repo at `bitbucket.org/uplandsoftware/node-red-nodes` returns 404). Contact: <https://github.com/lagvert>.
