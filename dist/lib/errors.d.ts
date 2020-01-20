/**
 * Base class for any error having to do with ProgramBuilder.
 */
export declare class ProgramError extends Error {
}
export declare class FlagParseError extends ProgramError {
}
export declare class ArgumentError extends ProgramError {
}
export declare class UnrecognizedSubcommandError extends ProgramError {
    constructor(parts: string[]);
}
export declare class UnspecifiedSubcommandError extends ProgramError {
    constructor();
}
export declare class TooManyArgumentsError extends ProgramError {
    constructor();
}
