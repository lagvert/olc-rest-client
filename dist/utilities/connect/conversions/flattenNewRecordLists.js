'use strict';

var flattenNewRecordList = require('./flattenNewRecordList.js');

function flattenNewRecordLists(newRecordsList) {
    return newRecordsList.map(flattenNewRecordList.flattenNewRecordList);
}

exports.flattenNewRecordLists = flattenNewRecordLists;
