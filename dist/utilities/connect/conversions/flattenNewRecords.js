'use strict';

var flattenNewRecord = require('./flattenNewRecord.js');

function flattenNewRecords(newRecords) {
    return newRecords.map(flattenNewRecord.flattenNewRecord);
}

exports.flattenNewRecords = flattenNewRecords;
