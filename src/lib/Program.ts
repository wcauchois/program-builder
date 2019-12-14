import PositionalArgument from "./PositionalArgument";
import { ParseError } from "./errors";
import ProgramBase from "./ProgramBase";

import path = require("path");

interface IParseHelpResult {
  resultType: "help";
}

interface IParseArgumentsResult<T> {
  resultType: "arguments";
  parsedArgs: T;
}

type ParseResult<T> = IParseHelpResult | IParseArgumentsResult<T>;

type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);

export default class Program<T> extends ProgramBase {
  private readonly keywordArgumentMap: Map<string, IKeywordArgument>;

  static readonly helpArgumentsSet = new Set(["-h", "--help"]);

  constructor(
    keywordArguments: IKeywordArgument[],
    programMetadata: IProgramMetadata,
    positionalArguments: PositionalArgument[]
  ) {
    super(keywordArguments, programMetadata, positionalArguments);
    this.keywordArgumentMap = new Map(
      keywordArguments.flatMap(argument =>
        argument.names.map(name => [name, argument])
      )
    );
  }

  generateHelpText() {
    let buffer = "";
    buffer += `Usage: ${path.basename(process.argv[1])}`;
    // TODO: Positional args
    buffer += "\n\n";
    for (const argument of this.keywordArguments) {
      buffer += `  ${argument.names.join(", ")}`;
    }
    return buffer;
  }

  exec(main: ProgramMain<T>, rawArgs?: string[]) {
    if (!rawArgs) {
      rawArgs = process.argv.slice(2);
    }
    let parseResult: ParseResult<T>;
    try {
      parseResult = this.parse(rawArgs);
    } catch (err) {
      console.error(`Error parsing commandline arguments: ${err.message}`);
      process.exit(1);
      throw new Error(); // TEMP: Isn't there supposed to be better handling for never-returning functions?
    }
    if (parseResult.resultType === "help") {
      const helpText = this.generateHelpText();
      console.log(helpText);
      process.exit(0); // TODO: Is this the right return code?
    } else {
      const args = parseResult.parsedArgs;
      const mainResult = Promise.resolve().then(() => main(args));
      mainResult
        .then(() => process.exit(0))
        .catch(err => {
          console.error(err.message || err);
          process.exit(1);
        });
    }
  }

  parse(rawArgs: string[]): ParseResult<T> {
    const argStack = rawArgs.slice();
    let currentParsedArgs: { [key: string]: any } = {};
    let currentArg: string | undefined;
    let unspecifiedRequiredArguments = this.keywordArguments.filter(
      argument => argument.metadata.required
    );
    while ((currentArg = argStack.shift())) {
      if (Program.helpArgumentsSet.has(currentArg)) {
        return { resultType: "help" };
      }
      const argument = this.keywordArgumentMap.get(currentArg);
      if (argument) {
        const argumentValue = argStack.shift();
        if (!argumentValue) {
          throw new ParseError(`Missing argument value`);
        }
        currentParsedArgs[argument.dest] = argument.convert(argumentValue);
        unspecifiedRequiredArguments = unspecifiedRequiredArguments.filter(
          a => argument !== a
        );
        continue;
      }
      throw new ParseError(`Unrecognized argument: ${currentArg}`);
    }
    if (unspecifiedRequiredArguments.length > 0) {
      throw new ParseError(`Missing required arguments`);
    }
    return {
      resultType: "arguments",
      parsedArgs: currentParsedArgs as any
    };
  }
}
