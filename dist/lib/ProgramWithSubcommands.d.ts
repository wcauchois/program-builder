import Program from "./Program";
export declare type ProgramSubcommandMap = {
    [subcommandName: string]: Program<any> | ProgramSubcommandMap;
};
export default class ProgramWithSubcommands {
    readonly subcommandMap: ProgramSubcommandMap;
    constructor(subcommandMap: ProgramSubcommandMap);
    execOrThrow(rawArgs?: string[]): Promise<void>;
    exec(rawArgs?: string[]): void;
}
