"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const errors_1 = require("./errors");
exports.convertString = input => input;
exports.convertInt = (input, argName) => {
    if (!utils_1.validInt(input)) {
        throw new errors_1.FlagParseError(`Please provide a valid integer for '${argName}'. Received: ${input}`);
    }
    return parseInt(input, 10);
};
exports.convertFloat = (input, argName) => {
    if (!utils_1.validFloat(input)) {
        throw new errors_1.FlagParseError(`Please provide a valid float for '${argName}'. Received: ${input}`);
    }
    return parseFloat(input);
};
