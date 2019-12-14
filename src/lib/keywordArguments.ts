import { ArgumentError } from "./errors";
import { IKeywordArgument, IKeywordArgumentMetadata } from "./types";

const intRegex = /^-?[0-9]+$/;

function validInt(s: string) {
  return intRegex.test(s);
}

function validFloat(s: string) {
  return !isNaN(parseFloat(s));
}

abstract class BaseKeywordArgument implements IKeywordArgument {
  readonly dest: string;
  readonly names: string[];
  readonly metadata: IKeywordArgumentMetadata;

  constructor(
    dest: string,
    names: string[] | string,
    metadata: IKeywordArgumentMetadata
  ) {
    this.dest = dest;
    this.names = Array.isArray(names) ? names : [names];
    this.metadata = metadata;
  }

  convert(inputString: string): any {
    return inputString;
  }
}

export class StringKeywordArgument extends BaseKeywordArgument {}

export class IntKeywordArgument extends BaseKeywordArgument {
  convert(inputString: string): any {
    if (!validInt(inputString)) {
      throw new ArgumentError("TODO");
    }
    return parseInt(inputString, 10);
  }
}

export class FloatKeywordArgument extends BaseKeywordArgument {
  convert(inputString: string): any {
    if (!validFloat(inputString)) {
      throw new ArgumentError("TODO");
    }
    return parseFloat(inputString);
  }
}
