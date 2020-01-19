import ProgramWithAction from "./ProgramWithAction";
export declare type ProgramSubcommandMap = {
    [subcommandName: string]: ProgramWithAction<any> | ProgramSubcommandMap;
};
export default class ProgramWithSubcommands {
    readonly subcommandMap: ProgramSubcommandMap;
    /**
     * @internal
     */
    constructor(subcommandMap: ProgramSubcommandMap);
    execOrThrow(rawArgs?: string[]): Promise<void>;
    exec(rawArgs?: string[]): void;
}
