"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intRegex = /^-?[0-9]+$/;
function validInt(s) {
    return intRegex.test(s);
}
exports.validInt = validInt;
function validFloat(s) {
    return !isNaN(parseFloat(s));
}
exports.validFloat = validFloat;
function isFlag(arg) {
    return arg.startsWith("-");
}
exports.isFlag = isFlag;
function expectUnreachable(x) { }
exports.expectUnreachable = expectUnreachable;
function rightPad(s, n) {
    let r = s;
    while (r.length < n) {
        r = r + " ";
    }
    return r;
}
exports.rightPad = rightPad;
