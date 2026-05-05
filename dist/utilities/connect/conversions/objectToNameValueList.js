'use strict';

var CommonTypeChecks = require('../../../api/common/CommonTypeChecks.js');
require('@objectif-lune/core');

function objectToNameValueList(jsonObject) {
    const result = [];
    Reflect.ownKeys(jsonObject).forEach((objectKey) => {
        if (typeof objectKey != "symbol") {
            const val = jsonObject[objectKey];
            const value = CommonTypeChecks.CommonTypeChecks.isScalar(val) ? val.toString() : "";
            result.push({
                name: objectKey.toString(),
                value
            });
        }
    });
    return result;
}

exports.objectToNameValueList = objectToNameValueList;
