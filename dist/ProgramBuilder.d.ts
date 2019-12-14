interface IArgumentMetadata {
    required: boolean;
    description?: string;
}
interface IArgument {
    readonly dest: string;
    /**
     * Names for this argument including short names (i.e. `-s`, `--string`).
     */
    readonly names: string[];
    readonly metadata: IArgumentMetadata;
    convert(inputString: string): any;
}
interface IArgumentCommonOptions<K extends string> {
    dest: K;
    description?: string;
}
interface IRequiredArgumentOptions<K extends string> extends IArgumentCommonOptions<K> {
    required: true;
}
interface IOptionalArgumentOptions<K extends string> extends IArgumentCommonOptions<K> {
    required?: false;
}
interface IProgramMetadata {
    description?: string;
}
declare abstract class ProgramBase {
    protected readonly argumentRegistry: IArgument[];
    protected readonly programMetadata: IProgramMetadata;
    constructor(argumentRegistry: IArgument[], programMetadata: IProgramMetadata);
}
declare type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]?: U;
}>;
declare type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]: U;
}>;
export default class ProgramBuilder<T> extends ProgramBase {
    private constructor();
    private withArgument;
    private optionsToMetadata;
    /**
     * Set the program description.
     *
     * @param newDescription The new description for the program.
     */
    description(newDescription: string): this;
    stringArg<K extends string>(names: string[] | string, options: IRequiredArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, string>;
    stringArg<K extends string>(names: string[] | string, options: IOptionalArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, string>;
    intArg<K extends string>(names: string[] | string, options: IRequiredArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, number>;
    intArg<K extends string>(names: string[] | string, options: IOptionalArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, number>;
    floatArg<K extends string>(names: string[] | string, options: IRequiredArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, number>;
    floatArg<K extends string>(names: string[] | string, options: IOptionalArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, number>;
    flag(name: string): void;
    build(): Program<T>;
    static newProgram(): ProgramBuilder<{}>;
}
interface IParseHelpResult {
    resultType: 'help';
}
interface IParseArgumentsResult<T> {
    resultType: 'arguments';
    parsedArgs: T;
}
declare type ParseResult<T> = IParseHelpResult | IParseArgumentsResult<T>;
declare type ProgramMain<T> = ((args: T) => Promise<void>) | ((args: T) => void);
declare class Program<T> extends ProgramBase {
    private readonly argumentMap;
    static readonly helpArgumentsSet: Set<string>;
    constructor(argumentRegistry: IArgument[], programMetadata: IProgramMetadata);
    generateHelpText(): string;
    exec(main: ProgramMain<T>, rawArgs?: string[]): void;
    parse(rawArgs: string[]): ParseResult<T>;
}
export declare type Arguments<T> = T extends Program<infer U> ? U : never;
export {};
