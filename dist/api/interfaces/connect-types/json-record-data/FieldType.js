'use strict';

exports.FieldType = void 0;
(function (FieldType) {
    FieldType[FieldType["STRING"] = 0] = "STRING";
    FieldType[FieldType["DATETIME"] = 1] = "DATETIME";
    FieldType[FieldType["CURRENCY"] = 2] = "CURRENCY";
    FieldType[FieldType["FLOAT"] = 3] = "FLOAT";
    FieldType[FieldType["BOOLEAN"] = 4] = "BOOLEAN";
})(exports.FieldType || (exports.FieldType = {}));
