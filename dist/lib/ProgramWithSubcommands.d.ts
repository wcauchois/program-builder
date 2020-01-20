import ProgramWithAction from "./ProgramWithAction";
export declare type ProgramSubcommandMap = {
    [subcommandName: string]: ProgramWithAction<any> | ProgramSubcommandMap;
};
export default class ProgramWithSubcommands {
    readonly subcommandMap: ProgramSubcommandMap;
    private readonly helpers;
    /**
     * @internal
     */
    constructor(subcommandMap: ProgramSubcommandMap);
    generateHelpText(): string;
    determineSubcommand(args: string[]): [string[], string[], ProgramWithAction<any>];
    execOrThrow(rawArgs?: string[]): Promise<void>;
    exec(rawArgs?: string[]): void;
}
