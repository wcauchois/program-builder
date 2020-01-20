import path = require("path");
import util = require("util");

import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import ValuedFlag from "./ValuedFlag";
import BooleanFlag from "./BooleanFlag";
import { ProgramMain } from "./types";
import TableWriter from "./TableWriter";
import ArgumentParser from "./ArgumentParser";
import ProgramHelpers from "./ProgramHelpers";

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
  private readonly helpers: ProgramHelpers;

  constructor(options: IProgramBaseOptions) {
    super(options);
    this.helpers = new ProgramHelpers();
  }

  generateHelpText(extraUsage?: string) {
    let buffer = "";
    const haveAnyFlags =
      this.valuedFlags.length > 0 || this.booleanFlags.length > 0;

    // Usage
    const usageParts = [
      this.helpers.getProgramName(),
      extraUsage,
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

  async execOrThrow(
    main: ProgramMain<T>,
    rawArgs?: string[],
    extraUsage?: string
  ) {
    if (!rawArgs) {
      rawArgs = process.argv.slice(2);
    }

    if (this.helpers.isHelpRequested(rawArgs)) {
      console.log(this.generateHelpText(extraUsage));
      return;
    }

    const parsedArgs = this.parseArgs(rawArgs);
    await main(parsedArgs);
  }

  exec(main: ProgramMain<T>, rawArgs?: string[]) {
    this.helpers.execAndExit(() => this.execOrThrow(main, rawArgs));
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
