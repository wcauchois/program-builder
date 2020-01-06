/**
 * Base class for any error having to do with ProgramBuilder.
 */
export declare class ProgramError extends Error {
}
export declare class FlagParseError extends ProgramError {
}
export declare class ArgumentError extends ProgramError {
}
export declare class TooManyArgumentsError extends ProgramError {
    constructor();
}
