'use strict';

var objectToNameValueList = require('./objectToNameValueList.js');

function propertiesWithIdListToNameValueList(propertyList) {
    return propertyList.map((properties) => {
        return { id: properties.id, properties: objectToNameValueList.objectToNameValueList(properties.properties) };
    });
}

exports.propertiesWithIdListToNameValueList = propertiesWithIdListToNameValueList;
