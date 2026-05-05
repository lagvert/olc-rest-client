# @objectif-lune/connect-rest-client

Patched fork of [`@objectif-lune/connect-rest-client`](https://www.npmjs.com/package/@objectif-lune/connect-rest-client) v1.0.1.

The upstream package is shipped as compiled `dist/` only (no public source repo accessible at the documented Bitbucket URL). This repo vendors the compiled distribution and applies fixes for bugs encountered in production use.

## Why a fork

Six bugs in the upstream lib at v1.0.1, all confirmed against a live OLC Connect server:

| # | File | Bug | Fix |
|---|---|---|---|
| 1 | `dist/rest/services/OutputCreationService.js` | `payload.createOnly` ternary inverted — calls `fetchOperationResultAsFolderAndFilenames` when `createOnly:true` and vice versa | Swap branches |
| 2 | `dist/rest/services/DocumentEntityService.js` | `fetchDocumentMetadata` builds `/entity/documents/{id}` instead of `/entity/documents/{id}/metadata` → 404 from server | Append `/metadata` to path |
| 3 | `dist/rest/services/DocumentSetEntityService.js` | Same `/metadata` suffix missing for document-set metadata | Append `/metadata` to path |
| 4 | `dist/api/OLConnectRestClient.js` | `getProgressOfOperation` only registers HTTP 200 handler; HTTP 404 (operation removed from active list = done) throws `ServerStatusCodeNotExpected` instead of completing | Register 404 handler returning `"done"` so the lib's `waitForDone` chains correctly to `getResult` |
| 5 | `dist/api/OLConnectRestClient.js` | `getProgressOfOperation` logs only `"X bytes"` for the response — actual progress value invisible | Wrap OK handler to log the response body |
| 6 | `dist/utilities/connect/conversions/flattenNameValueList.js` | `flattenNameValueList` smart-casts string values to Number/Date based on regex tests. Destroys: 44-char DMC codes (`Number.MAX_SAFE_INTEGER` overflow), `"00000000"` IDs (leading-zero loss), `"021246535"` sequence numbers (padding loss). API spec defines `value` as type `string` — coercion violates the contract | Pass through untouched: `result[name] = value`. Consumers convert if needed |

## Usage

```json
{
  "dependencies": {
    "@objectif-lune/connect-rest-client": "github:lagvert/olc-rest-client#v1.0.1-fork.1"
  }
}
```

Or pin to a specific tag for reproducibility.

API surface is identical to the upstream package — drop-in replacement.

## Compatibility

- Node 20.19.5+ (matches upstream `engines`)
- TypeScript types in `dist/@types/`

### OL Connect server compatibility

The patches address client-side bugs. The relevant server endpoint behaviours have been verified across OL Connect 2021.2 and 2024.2 production servers. The published REST API release notes from 2021.2 through 2026.1 contain no documented changes that would contradict the patches in this fork.

| Bug | Server behaviour 2021.2 | Server behaviour 2024.2 | Future risk (2026.1+) |
|---|---|---|---|
| 1 — `createOnly` ternary | n/a — pure client | n/a — pure client | none, lib-internal |
| 2 — missing `/metadata` suffix | confirmed: missing suffix → HTTP 404 | confirmed: missing suffix → HTTP 404 | stable since 2018+ |
| 3 — DocumentSet `/metadata` | as Bug 2 | as Bug 2 | as Bug 2 |
| 4 — `getProgress` returns 404 once op completes | confirmed | confirmed | stable |
| 5 — log format (cosmetic) | n/a — pure client | n/a — pure client | irrelevant |
| 6 — `flattenNameValueList` smart-cast | server returns spec-compliant strings | server returns spec-compliant strings | stable, purely client-side |

### REST API changes by OL Connect version (summary 2021.2 → 2026.1)

| Version | Documented REST API change |
|---|---|
| 2021.2 | HTML/Email content creation: better status codes (400 instead of 500). `/entity/datarecords/values?optimized=true` encoding fix. |
| 2022.1 | `Content-Disposition` header added to FileStore download endpoints. |
| 2022.2 | "Convert DM records to simplified JSON" option (DataMapping output). |
| 2023.1 | All-in-one print can now return `xxxSetID(s)`. Search restriction on DataSets/ContentSets/JobSets. |
| 2023.2 | No documented REST API changes. |
| 2024.1 | New endpoint `/workflow/jobcreation/default/{contentSetId}` (job creation without preset). New endpoint `/statistics/jobset/{jobSetId}` with document tags. CORS configuration option. |
| 2024.2 | `getOperations` returns Managed File Name+ID. `jobOutputFolder` parameter for Output Creation. JobSet statistics levels. New Filestore RuntimeParameter endpoints. **REST API restricted to localhost by default** (configurable). HttpOnly cookies. |
| 2025.1 | Document set properties in Job Statistics. Stack overflow fix on excessive REST calls. **Auth rate limiting** added. |
| 2025.2.3 | **`Output Creation Get Result of Operation (as Text)` endpoint now restricted to `Content-Type: text/plain`** (95317). The lib already sends this content type — fork remains compatible. Concurrent Job Statistics fix. New PostScript→PDF endpoint. |
| 2026.1 | OpenAPI/Swagger documentation introduced at `http://localhost:9340/serverengine/doc/`. XPS→PDF converter endpoint. Thumbnail handling improvements. |

## Upstream attribution

Original code © Upland Software Inc., MIT licensed. See LICENSE for full notice.

The fork modifications are listed in `CHANGELOG.md`. To compare with upstream: `npm pack @objectif-lune/connect-rest-client@1.0.1` and diff `dist/`.

## Caveats

- This fork is shipped as compiled `dist/` only. There is no TypeScript source repository — patches were applied directly to the compiled JS by inspecting the bundled output.
