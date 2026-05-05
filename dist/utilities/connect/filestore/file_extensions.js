'use strict';

var path = require('node:path');
var ConnectFileExtensions = require('../../../api/interfaces/connect-types/filestore/ConnectFileExtensions.js');
require('../../../api/interfaces/connect-types/filestore/FileType.js');
require('../../../api/interfaces/connect-types/filestore/TemplateReportFilter.js');
require('../../../api/interfaces/connect-types/json-record-data/FieldType.js');
require('../../../api/interfaces/connect-types/search-parameters/SearchParameterEntity.js');
require('../../../api/interfaces/connect-types/statistics/JobStatistics.js');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

function ensureExtension(filename, extension) {
    return typeof filename == "number"
        ? `${filename}` // If it's a number, convert to string
        : /^\d+$/.test(filename) || path__namespace.extname(filename) || filename.trim().length < 1 // njsscan-ignore: regex_dos
            ? filename
            : `${filename}${extension}`;
}
function ensureValidTemplateId(templateIdentifier) {
    return ensureExtension(templateIdentifier, ConnectFileExtensions.ConnectFileExtensions.TEMPLATE);
}
function ensureValidDatamapper(dmConfigId) {
    return ensureExtension(dmConfigId, ConnectFileExtensions.ConnectFileExtensions.DATA_MAPPER);
}
function ensureValidJobPreset(jobpreset) {
    return ensureExtension(jobpreset, ConnectFileExtensions.ConnectFileExtensions.JOB_PRESET);
}
function ensureValidOutputPreset(outputpreset) {
    return ensureExtension(outputpreset, ConnectFileExtensions.ConnectFileExtensions.OUTPUT_PRESET);
}

exports.ensureExtension = ensureExtension;
exports.ensureValidDatamapper = ensureValidDatamapper;
exports.ensureValidJobPreset = ensureValidJobPreset;
exports.ensureValidOutputPreset = ensureValidOutputPreset;
exports.ensureValidTemplateId = ensureValidTemplateId;
