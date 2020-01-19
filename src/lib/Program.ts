import path = require("path");
import util = require("util");

import PositionalArgument from "./PositionalArgument";
import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import KeywordArgument from "./KeywordArgument";
import { ArgumentError, TooManyArgumentsError } from "./errors";
import { isFlag } from "./utils";
import Flag from "./Flag";
import { ProgramMain } from "./types";

function rightPad(s: string, n: number) {
  let r = s;
  while (r.length < n) {
    r = r + " ";
  }
  return r;
}

function renderColumnarData(data: string[][], padding = 2) {
  const maxColumnLengths = new Map<number, number>();
  for (const row of data) {
    for (let colNum = 0; colNum < row.length; colNum++) {
      maxColumnLengths.set(
        colNum,
        Math.max(maxColumnLengths.get(colNum) || 0, row[colNum].length)
      );
    }
  }
  const lines = [];
  for (const row of data) {
    const paddedCols = row.map((col, i) =>
      rightPad(col, (maxColumnLengths.get(i) || 0) + padding)
    );
    lines.push(rightPad("", padding) + paddedCols.join(""));
  }
  return lines.join("\n");
}

/**
 * A built program that can parse arguments and execute a main function
 * against those arguments.
 *
 * @remarks
 * Construct a Program using a {@link ProgramBuilder}, then call {@link Program.exec}
 * to execute your main function.
 *
 * Example:
 *
 * ```typescript
 * const program = ProgramBuilder.newBuilder().build();
 * program.exec(args => {
 *   // Do things with args
 * });
 * ```
 */
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
    const haveAnyOptions =
      this.keywordArguments.length > 0 || this.flags.length > 0;

    // Usage
    const usageParts = [
      path.basename(process.argv[1]),
      haveAnyOptions ? "[options]" : undefined,
      this.positionalArguments.nonEmpty
        ? this.positionalArguments.getSpecForUsage()
        : undefined
    ].filter(x => x) as string[];
    buffer += `Usage: ${usageParts.join(" ")}`;

    // Description
    if (this.programMetadata.description) {
      buffer += `\n\n${this.programMetadata.description}`;
    }

    // Options (flags and keyword arguments)
    if (haveAnyOptions) {
      const sortedArgumentsAndFlags = (this.keywordArguments as Array<
        KeywordArgument | Flag
      >).concat(this.flags);
      sortedArgumentsAndFlags.sort((a, b) => a.order - b.order);
      buffer += `\n\nOptions:\n`;
      buffer += renderColumnarData(
        sortedArgumentsAndFlags.map(argOrFlag =>
          argOrFlag.generateHelpColumns()
        )
      );
    }
    return buffer;
  }

  private isHelpRequested(args: string[]) {
    return args.length > 0 && Program.helpArgumentsSet.has(args[0]);
  }

  printHelp() {
    const helpText = this.generateHelpText();
    console.log(helpText);
  }

  async execOrThrow(main: ProgramMain<T>, rawArgs?: string[]) {
    if (!rawArgs) {
      rawArgs = process.argv.slice(2);
    }

    if (this.isHelpRequested(rawArgs)) {
      this.printHelp();
      return;
    }

    const parsedArgs = this.parseArgs(rawArgs);
    await main(parsedArgs);
  }

  private formatError(err: any) {
    if (typeof err.message === "string") {
      return err.message;
    } else if (typeof err === "string") {
      return err;
    } else {
      return util.inspect(err);
    }
  }

  exec(main: ProgramMain<T>, rawArgs?: string[]) {
    this.execOrThrow(main, rawArgs)
      .then(() => process.exit(0))
      .catch(err => {
        console.error(this.formatError(err));
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
