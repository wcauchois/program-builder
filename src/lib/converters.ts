import { validInt, validFloat } from "./utils";
import { FlagParseError } from "./errors";
import { Converter } from "./types";

export const convertString: Converter<string> = input => input;

export const convertInt: Converter<number> = (input, argName) => {
  if (!validInt(input)) {
    throw new FlagParseError(
      `Please provide a valid integer for '${argName}'. Received: ${input}`
    );
  }
  return parseInt(input, 10);
};

export const convertFloat: Converter<number> = (input, argName) => {
  if (!validFloat(input)) {
    throw new FlagParseError(
      `Please provide a valid float for '${argName}'. Received: ${input}`
    );
  }
  return parseFloat(input);
};
