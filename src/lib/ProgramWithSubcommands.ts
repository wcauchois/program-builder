import Program from "./Program";

export type ProgramSubcommandMap = {
  [subcommandName: string]: Program<any> | ProgramSubcommandMap;
};

export default class ProgramWithSubcommands {
  readonly subcommandMap: ProgramSubcommandMap;

  constructor(subcommandMap: ProgramSubcommandMap) {
    this.subcommandMap = subcommandMap;
  }

  async execOrThrow(rawArgs?: string[]) {}

  exec(rawArgs?: string[]) {}
}
