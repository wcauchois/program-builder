import ProgramBase from "./ProgramBase";
import Program from "./Program";
declare type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]?: U;
}>;
declare type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]: U;
}>;
export default class ProgramBuilder<T> extends ProgramBase {
    private currentArgumentPosition;
    private constructor();
    private withKeywordArgument;
    private optionsToMetadata;
    private convertNames;
    /**
     * Set the program description.
     *
     * @param newDescription The new description for the program.
     */
    description(newDescription: string): this;
    arg<K extends string>(dest: K): ExtendProgramBuilderWithRequired<T, K, string>;
    optionalArg<K extends string>(dest: K): ExtendProgramBuilderWithOptional<T, K, string>;
    stringArg<K extends string>(names: string, options: IRequiredKeywordArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, string>;
    stringArg<K extends string>(names: string, options: IOptionalKeywordArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, string>;
    intArg<K extends string>(names: string, options: IRequiredKeywordArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, number>;
    intArg<K extends string>(names: string, options: IOptionalKeywordArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, number>;
    floatArg<K extends string>(names: string, options: IRequiredKeywordArgumentOptions<K>): ExtendProgramBuilderWithRequired<T, K, number>;
    floatArg<K extends string>(names: string, options: IOptionalKeywordArgumentOptions<K>): ExtendProgramBuilderWithOptional<T, K, number>;
    flag(name: string): void;
    build(): Program<T>;
    static newProgram(): ProgramBuilder<{}>;
}
export {};
