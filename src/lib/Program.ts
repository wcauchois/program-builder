import path = require("path");

import PositionalArgument from "./PositionalArgument";
import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import KeywordArgument from "./KeywordArgument";
import { ArgumentError, TooManyArgumentsError } from "./errors";
import { isFlag } from "./utils";
import Flag from "./Flag";

type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);

export default class Program<T> extends ProgramBase {
  private readonly flagsByName: Map<string, KeywordArgument | Flag>;

  static readonly helpArgumentsSet = new Set(["-h", "--help"]);

  constructor(options: IProgramBaseOptions) {
    super(options);
    this.flagsByName = new Map(
      options.keywordArguments
        .flatMap(argument =>
          argument.names.map(
            name => [name, argument] as [string, KeywordArgument | Flag]
          )
        )
        .concat(
          options.flags.flatMap(flag =>
            flag.allNames.map(
              name => [name, flag] as [string, KeywordArgument | Flag]
            )
          )
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

  private isHelpRequested(args: string[]) {
    return args.length > 0 && Program.helpArgumentsSet.has(args[0]);
  }

  printHelpAndExit(): never {
    const helpText = this.generateHelpText();
    console.log(helpText);
    process.exit(0);
  }

  exec(main: ProgramMain<T>, rawArgs?: string[]) {
    if (!rawArgs) {
      rawArgs = process.argv.slice(2);
    }

    if (this.isHelpRequested(rawArgs)) {
      this.printHelpAndExit();
    }

    let parsedArgs: T;
    try {
      parsedArgs = this.parseArgs(rawArgs);
    } catch (err) {
      console.error(err.message || err);
      process.exit(1);
    }

    const mainResult = Promise.resolve().then(() => main(parsedArgs));
    mainResult
      .then(() => process.exit(0))
      .catch(err => {
        console.error(err.message || err);
        process.exit(1);
      });
  }

  parseArgs(rawArgs: string[]): T {
    const argStack = rawArgs.slice();
    const parsedArgs: { [key: string]: any } = {};

    const requiredArgumentStack = this.positionalArguments.required.slice();
    const optionalArgumentStack = this.positionalArguments.optional.slice();

    let currentArg: string | undefined;
    let unspecifiedRequiredArguments = this.keywordArguments.filter(
      argument => argument.metadata.required
    );

    while ((currentArg = argStack.shift())) {
      if (isFlag(currentArg)) {
        const flag = this.flagsByName.get(currentArg);
        if (!flag) {
          throw new ArgumentError(`Unrecognized flag: ${currentArg}`);
        }
        if (flag instanceof Flag) {
          parsedArgs[flag.dest] = flag.isPositiveName(currentArg); // Else, it is a negative name.
        } else {
          // Flag is a KeywordArgument
          const argumentValue = argStack.shift();
          if (!argumentValue) {
            throw new ArgumentError(`Missing value for flag '${currentArg}'`);
          }
          parsedArgs[flag.dest] = flag.converter(argumentValue, currentArg);
          unspecifiedRequiredArguments = unspecifiedRequiredArguments.filter(
            x => x !== flag
          );
        }
      } else {
        let arg: PositionalArgument | undefined;
        if (requiredArgumentStack.length > 0) {
          arg = requiredArgumentStack.shift();
        } else if (optionalArgumentStack.length > 0) {
          arg = optionalArgumentStack.shift();
        }
        if (!arg) {
          throw new TooManyArgumentsError();
        }
        parsedArgs[arg.dest] = currentArg;
      }
    }

    // Validate that all required arguments were specified
    if (requiredArgumentStack.length > 0) {
      throw new ArgumentError(
        `Not enough positional arguments were specified. Expected: at least ${this.positionalArguments.required.length}`
      );
    }
    if (unspecifiedRequiredArguments.length > 0) {
      throw new ArgumentError(
        `The following required keyword flags were not specified: ${unspecifiedRequiredArguments
          .map(x => x.firstName)
          .join(", ")}`
      );
    }

    return parsedArgs as T;
  }
}
