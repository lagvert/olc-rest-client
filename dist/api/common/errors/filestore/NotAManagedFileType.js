'use strict';

var core = require('@objectif-lune/core');

class NotAManagedFileType extends core.ErrorWithCode {
    type;
    constructor(type) {
        super();
        this.type = type;
    }
}

exports.NotAManagedFileType = NotAManagedFileType;
