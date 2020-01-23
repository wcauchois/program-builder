import ProgramWithAction from "./ProgramWithAction";
import ProgramHelpers from "./ProgramHelpers";
import {
  UnrecognizedSubcommandError,
  UnspecifiedSubcommandError
} from "./errors";
import TableWriter from "./TableWriter";
import { IProgramWithSubcommandsMetadata } from "./types";

export type ProgramSubcommandMap = {
  [subcommandName: string]: ProgramWithAction<any> | ProgramSubcommandMap;
};

function flattenSubcommandMap(
  map: ProgramWithAction<any> | ProgramSubcommandMap,
  path: string[] = []
): Array<[string[], ProgramWithAction<any>]> {
  if (map instanceof ProgramWithAction) {
    return [[path, map]];
  } else {
    return Object.entries(map).flatMap(([key, value]) =>
      flattenSubcommandMap(value, path.concat([key]))
    );
  }
}

export default class ProgramWithSubcommands {
  readonly subcommandMap: ProgramSubcommandMap;
  private readonly helpers: ProgramHelpers;
  readonly metadata: IProgramWithSubcommandsMetadata;

  /**
   * @internal
   */
  constructor(
    subcommandMap: ProgramSubcommandMap,
    metadata: IProgramWithSubcommandsMetadata
  ) {
    this.subcommandMap = subcommandMap;
    this.metadata = metadata;
    this.helpers = new ProgramHelpers();
  }

  generateHelpText(): string {
    let buffer = "";

    buffer += `Usage: ${this.helpers.getProgramName()} COMMAND [options]`;

    if (this.metadata.description) {
      buffer += `\n\n${this.metadata.description}`;
    }

    buffer += "\n\n";
    const allSubcommands = flattenSubcommandMap(this.subcommandMap);
    const tw = new TableWriter();
    for (const [subcommandNameParts, subcommand] of allSubcommands) {
      const row = [subcommandNameParts.join(" ")];
      const { description } = subcommand.programMetadata;
      if (description) {
        row.push(description);
      }
      tw.writeRow(row);
    }

    buffer += `Commands:\n${tw.toString()}`;

    return buffer;
  }

  determineSubcommand(
    args: string[]
  ): [string[], string[], ProgramWithAction<any>] {
    const argStack = args.slice();
    let currentMap = this.subcommandMap;
    let currentArg: string | undefined;
    const consumedArgs: string[] = [];
    while ((currentArg = argStack.shift())) {
      consumedArgs.push(currentArg);
      const mapValue = currentMap[currentArg];
      if (!mapValue) {
        throw new UnrecognizedSubcommandError(consumedArgs);
      } else if (mapValue instanceof ProgramWithAction) {
        return [argStack, consumedArgs, mapValue];
      } else {
        currentMap = mapValue;
      }
    }
    throw new UnrecognizedSubcommandError(consumedArgs);
  }

  async execOrThrow(rawArgs?: string[]) {
    if (!rawArgs) {
      rawArgs = this.helpers.getProcessArgs();
    }

    if (rawArgs.length === 0) {
      throw new UnspecifiedSubcommandError();
    }

    if (this.helpers.isHelpRequested(rawArgs)) {
      console.log(this.generateHelpText());
      return;
    }

    const [newArgs, subcommandParts, subcommand] = this.determineSubcommand(
      rawArgs
    );
    const extraUsage = subcommandParts.join(" ");

    await subcommand.execOrThrow(subcommand.action, newArgs, extraUsage);
  }

  exec(rawArgs?: string[]) {
    this.helpers.execAndExit(() => this.execOrThrow(rawArgs));
  }
}
