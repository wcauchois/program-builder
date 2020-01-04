/**
 * Base class for any error having to do with ProgramBuilder.
 */
export class ProgramError extends Error {}

export class FlagParseError extends ProgramError {}

export class ArgumentError extends ProgramError {}

export class TooManyArgumentsError extends ProgramError {
  constructor() {
    // TODO: Include more information in this message.
    super(`Too many positional arguments were specified!`);
  }
}
