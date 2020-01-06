import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
declare type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);
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
export {};
