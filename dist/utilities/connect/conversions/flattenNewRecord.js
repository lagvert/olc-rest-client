'use strict';

var objectToNameValueList = require('./objectToNameValueList.js');

function flattenNewRecord(newRecord) {
    return { fields: objectToNameValueList.objectToNameValueList(newRecord.fields) };
}

exports.flattenNewRecord = flattenNewRecord;
