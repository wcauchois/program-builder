"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
const intRegex = /^-?[0-9]+$/;
function validInt(s) {
    return intRegex.test(s);
}
function validFloat(s) {
    return !isNaN(parseFloat(s));
}
class BaseKeywordArgument {
    constructor(dest, names, metadata) {
        this.dest = dest;
        this.names = Array.isArray(names) ? names : [names];
        this.metadata = metadata;
    }
    convert(inputString) {
        return inputString;
    }
}
class StringKeywordArgument extends BaseKeywordArgument {
}
exports.StringKeywordArgument = StringKeywordArgument;
class IntKeywordArgument extends BaseKeywordArgument {
    convert(inputString) {
        if (!validInt(inputString)) {
            throw new errors_1.ArgumentError("TODO");
        }
        return parseInt(inputString, 10);
    }
}
exports.IntKeywordArgument = IntKeywordArgument;
class FloatKeywordArgument extends BaseKeywordArgument {
    convert(inputString) {
        if (!validFloat(inputString)) {
            throw new errors_1.ArgumentError("TODO");
        }
        return parseFloat(inputString);
    }
}
exports.FloatKeywordArgument = FloatKeywordArgument;
