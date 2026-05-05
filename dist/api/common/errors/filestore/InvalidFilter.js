'use strict';

var core = require('@objectif-lune/core');

class InvalidFilter extends core.ErrorWithCode {
    filter;
    constructor(filter) {
        super();
        this.filter = filter;
    }
}

exports.InvalidFilter = InvalidFilter;
