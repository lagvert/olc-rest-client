'use strict';

// 2012-04-28T14:00:00.000Z
const DATEFORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?Z$/;
const FLOATFORMAT = /^\d*(\.\d*)?$/;
const INTEGERFORMAT = /^\d+$/;
function flattenNameValueList(nameValueList) {
    const result = Object.create(null);
    nameValueList.forEach((nameValueItem) => {
        const v = nameValueItem.value;
        result[nameValueItem.name] = DATEFORMAT.test(v)
            ? new Date(Date.parse(v))
            : FLOATFORMAT.test(v)
                ? Number.parseFloat(v)
                : INTEGERFORMAT.test(v)
                    ? Number.parseInt(v)
                    : v;
    });
    return result;
}

exports.flattenNameValueList = flattenNameValueList;
