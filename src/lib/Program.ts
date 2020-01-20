import path = require("path");
import util = require("util");

import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import ValuedFlag from "./ValuedFlag";
import BooleanFlag from "./BooleanFlag";
import { ProgramMain } from "./types";
import TableWriter from "./TableWriter";
import ArgumentParser from "./ArgumentParser";

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

  static readonly helpArgumentsSet = new Set(["-h", "--help"]);

  constructor(options: IProgramBaseOptions) {
    super(options);
  }

  generateHelpText() {
    let buffer = "";
    const haveAnyFlags = this.valuedFlags.length > 0 || this.booleanFlags.length > 0;

    // Usage
    const usageParts = [
      path.basename(process.argv[1]),
      haveAnyFlags ? "[options]" : undefined,
      this.positionalArguments.nonEmpty
        ? this.positionalArguments.getSpecForUsage()
        : undefined
    ].filter(x => x) as string[];
    buffer += `Usage: ${usageParts.join(" ")}`;

    // Description
    if (this.programMetadata.description) {
      buffer += `\n\n${this.programMetadata.description}`;
    }

    // Flags
    if (haveAnyFlags) {
      const allFlagsSorted = (this.valuedFlags as Array<
        ValuedFlag | BooleanFlag
      >).concat(this.booleanFlags);
      allFlagsSorted.sort((a, b) => a.order - b.order);
      buffer += `\n\nOptions:\n`;
      const tw = new TableWriter();
      allFlagsSorted.forEach(f => f.getDocumentation().writeTo(tw));
      buffer += tw.toString();
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
    const parser = new ArgumentParser({
      booleanFlags: this.booleanFlags,
      positionalArguments: this.positionalArguments,
      valuedFlags: this.valuedFlags
    });

    parser.consumeAll(rawArgs);
    parser.validate();
    
    return parser.parsedArgs as T;
  }
}
