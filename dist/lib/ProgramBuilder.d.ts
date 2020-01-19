import ProgramBase from "./ProgramBase";
import Program from "./Program";
import { IRequiredKeywordArgumentOptions, IOptionalKeywordArgumentOptions, IPositionalArgumentMetadata, Converter, IFlagOptions, ProgramMain } from "./types";
import ProgramWithAction from "./ProgramWithAction";
declare type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]?: U;
}>;
declare type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]: U;
}>;
export default class ProgramBuilder<T> extends ProgramBase {
    private flagNumber;
    private constructor();
    private keywordOptionsToMetadata;
    private splitNames;
    /**
     * Set the program description.
     *
     * @param newDescription The new description for the program.
     */
    description(newDescription: string): this;
    arg<K extends string>(dest: K, options?: IPositionalArgumentMetadata): ExtendProgramBuilderWithRequired<T, K, string>;
    optionalArg<K extends string>(dest: K, options?: IPositionalArgumentMetadata): ExtendProgramBuilderWithOptional<T, K, string>;
    customFlag<K extends string, V>(name: string, options: IOptionalKeywordArgumentOptions<K, V>, converter: Converter<V>): ExtendProgramBuilderWithOptional<T, K, V>;
    customFlag<K extends string, V>(name: string, options: IRequiredKeywordArgumentOptions<K, V>, converter: Converter<V>): ExtendProgramBuilderWithRequired<T, K, V>;
    stringFlag<K extends string>(name: string, options: IOptionalKeywordArgumentOptions<K, string>): ExtendProgramBuilderWithOptional<T, K, string>;
    stringFlag<K extends string>(name: string, options: IRequiredKeywordArgumentOptions<K, string>): ExtendProgramBuilderWithRequired<T, K, string>;
    intFlag<K extends string>(name: string, options: IOptionalKeywordArgumentOptions<K, number>): ExtendProgramBuilderWithOptional<T, K, number>;
    intFlag<K extends string>(name: string, options: IRequiredKeywordArgumentOptions<K, number>): ExtendProgramBuilderWithRequired<T, K, number>;
    floatFlag<K extends string>(name: string, options: IOptionalKeywordArgumentOptions<K, number>): ExtendProgramBuilderWithOptional<T, K, number>;
    floatFlag<K extends string>(name: string, options: IRequiredKeywordArgumentOptions<K, number>): ExtendProgramBuilderWithRequired<T, K, number>;
    flag<K extends string>(name: string, options: IFlagOptions<K>): ExtendProgramBuilderWithRequired<T, K, boolean>;
    build(): Program<T>;
    bind(action: ProgramMain<T>): ProgramWithAction<T>;
    static newBuilder(): ProgramBuilder<{}>;
}
export {};
