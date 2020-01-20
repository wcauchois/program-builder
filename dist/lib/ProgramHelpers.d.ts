export default class ProgramHelpers {
    static readonly helpArgumentsSet: Set<string>;
    isHelpRequested(args: string[]): boolean;
    formatError(err: any): any;
    getProcessArgs(): string[];
    getProgramName(): string;
    execAndExit(fn: () => Promise<void>): void;
}
