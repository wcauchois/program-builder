import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import { ProgramMain } from "./types";
export default class Program<T> extends ProgramBase {
    private readonly flagsByName;
    static readonly helpArgumentsSet: Set<string>;
    constructor(options: IProgramBaseOptions);
    generateHelpText(): string;
    private isHelpRequested;
    printHelpAndExit(): never;
    exec(main: ProgramMain<T>, rawArgs?: string[]): void;
    parseArgs(rawArgs: string[]): T;
}
