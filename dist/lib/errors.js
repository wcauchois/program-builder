"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for any error having to do with ProgramBuilder.
 */
class ProgramError extends Error {
}
exports.ProgramError = ProgramError;
class FlagParseError extends ProgramError {
}
exports.FlagParseError = FlagParseError;
class ArgumentError extends ProgramError {
}
exports.ArgumentError = ArgumentError;
class TooManyArgumentsError extends ProgramError {
    constructor() {
        // TODO: Include more information in this message.
        super(`Too many positional arguments were specified!`);
    }
}
exports.TooManyArgumentsError = TooManyArgumentsError;
