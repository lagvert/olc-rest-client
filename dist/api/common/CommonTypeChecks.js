'use strict';

var core = require('@objectif-lune/core');

class CommonTypeChecks extends core.CommonTypeChecks {
    static isArtefactIdOrName(toe) {
        return CommonTypeChecks.isPositiveInteger(toe) || CommonTypeChecks.isNonEmptyString(toe);
    }
}

exports.CommonTypeChecks = CommonTypeChecks;
