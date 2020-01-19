import ProgramBase, { IProgramBaseOptions } from "./ProgramBase";
import { ProgramMain } from "./types";
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
    private readonly flagsByName;
    static readonly helpArgumentsSet: Set<string>;
    constructor(options: IProgramBaseOptions);
    generateHelpText(): string;
    private isHelpRequested;
    printHelp(): void;
    execOrThrow(main: ProgramMain<T>, rawArgs?: string[]): Promise<void>;
    private formatError;
    exec(main: ProgramMain<T>, rawArgs?: string[]): void;
    parseArgs(rawArgs: string[]): T;
}
