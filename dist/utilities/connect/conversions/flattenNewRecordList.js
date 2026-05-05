'use strict';

var flattenNewRecords = require('./flattenNewRecords.js');

function flattenNewRecordList(newRecord) {
    const result = { records: newRecord.records.map(flattenNewRecords.flattenNewRecords) };
    return result;
}

exports.flattenNewRecordList = flattenNewRecordList;
