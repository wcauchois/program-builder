export default class ProgramHelpers {
    static readonly helpArgumentsSet: Set<string>;
    isHelpRequested(args: string[]): boolean;
    getProcessArgs(): string[];
    getProgramName(): string;
    execAndExit(fn: () => Promise<void>): void;
}
