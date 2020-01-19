import ProgramWithAction from "./ProgramWithAction";

export type ProgramSubcommandMap = {
  [subcommandName: string]: ProgramWithAction<any> | ProgramSubcommandMap;
};

export default class ProgramWithSubcommands {
  readonly subcommandMap: ProgramSubcommandMap;

  /**
   * @internal
   */
  constructor(subcommandMap: ProgramSubcommandMap) {
    this.subcommandMap = subcommandMap;
  }

  async execOrThrow(rawArgs?: string[]) {}

  exec(rawArgs?: string[]) {}
}
