import ProgramWithAction from "./ProgramWithAction";
import { IProgramWithSubcommandsMetadata } from "./types";
export declare type ProgramSubcommandMap = {
    [subcommandName: string]: ProgramWithAction<any> | ProgramSubcommandMap;
};
export default class ProgramWithSubcommands {
    readonly subcommandMap: ProgramSubcommandMap;
    private readonly helpers;
    readonly metadata: IProgramWithSubcommandsMetadata;
    /**
     * @internal
     */
    constructor(subcommandMap: ProgramSubcommandMap, metadata: IProgramWithSubcommandsMetadata);
    generateHelpText(): string;
    determineSubcommand(args: string[]): [string[], string[], ProgramWithAction<any>];
    execOrThrow(rawArgs?: string[]): Promise<void>;
    exec(rawArgs?: string[]): void;
}
