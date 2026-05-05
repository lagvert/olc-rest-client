'use strict';

// Patched: pass values through untouched. The upstream version applied
// regex-based smart-coercion (INTEGERFORMAT/FLOATFORMAT/DATEFORMAT) and
// converted strings to Number/Date. That destroyed:
//   - 44-char DMC barcode codes (Number.MAX_SAFE_INTEGER overflow)
//   - "00000000"-style padded IDs (became Number(0), leading zeros lost)
//   - "021246535"-style sequence numbers (padding lost)
//   - Date strings not exactly matching the regex (became plain strings)
// API spec defines value as type "string" — coercion violates the contract.
// Consumers convert if needed.
function flattenNameValueList(nameValueList) {
    const result = Object.create(null);
    nameValueList.forEach((nameValueItem) => {
        result[nameValueItem.name] = nameValueItem.value;
    });
    return result;
}

exports.flattenNameValueList = flattenNameValueList;
