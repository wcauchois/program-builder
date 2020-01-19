import ProgramBase from "./ProgramBase";
import Program from "./Program";
import { IRequiredValuedFlagOptions, IOptionalValuedFlagOptions, IPositionalArgumentMetadata, Converter, IFlagOptions, ProgramMain } from "./types";
import ProgramWithAction from "./ProgramWithAction";
export declare type ExtendProgramBuilderWithOptional<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]?: U;
}>;
export declare type ExtendProgramBuilderWithRequired<T, K extends string, U> = ProgramBuilder<T & {
    [P in K]: U;
}>;
/**
 * Entry point to the library and the way to start constructing a {@link Program} to
 * be executed.
 *
 * @remarks
 * Create a new ProgramBuilder with {@link ProgramBuilder.newBuilder}.
 */
export default class ProgramBuilder<T> extends ProgramBase {
    private flagNumber;
    private constructor();
    private keywordOptionsToMetadata;
    private splitNames;
    /**
     * Set the program description.
     *
     * @param newDescription - The new description for the program.
     */
    description(newDescription: string): this;
    arg<K extends string>(dest: K, options?: IPositionalArgumentMetadata): ExtendProgramBuilderWithRequired<T, K, string>;
    optionalArg<K extends string>(dest: K, options?: IPositionalArgumentMetadata): ExtendProgramBuilderWithOptional<T, K, string>;
    customFlag<K extends string, V>(name: string, options: IOptionalValuedFlagOptions<K, V>, converter: Converter<V>): ExtendProgramBuilderWithOptional<T, K, V>;
    customFlag<K extends string, V>(name: string, options: IRequiredValuedFlagOptions<K, V>, converter: Converter<V>): ExtendProgramBuilderWithRequired<T, K, V>;
    stringFlag<K extends string>(name: string, options: IOptionalValuedFlagOptions<K, string>): ExtendProgramBuilderWithOptional<T, K, string>;
    stringFlag<K extends string>(name: string, options: IRequiredValuedFlagOptions<K, string>): ExtendProgramBuilderWithRequired<T, K, string>;
    intFlag<K extends string>(name: string, options: IOptionalValuedFlagOptions<K, number>): ExtendProgramBuilderWithOptional<T, K, number>;
    intFlag<K extends string>(name: string, options: IRequiredValuedFlagOptions<K, number>): ExtendProgramBuilderWithRequired<T, K, number>;
    /**
     * Add an optional float-valued flag to the program.
     *
     * @param name - The name for the flag, including leading dashes. Multiple alternative
     * names may be specified by separating them within the string by commas. For example,
     * "-i,--input".
     * @param options - See {@link IOptionalValuedFlagOptions}
     */
    floatFlag<K extends string>(name: string, options: IOptionalValuedFlagOptions<K, number>): ExtendProgramBuilderWithOptional<T, K, number>;
    floatFlag<K extends string>(name: string, options: IRequiredValuedFlagOptions<K, number>): ExtendProgramBuilderWithRequired<T, K, number>;
    flag<K extends string>(name: string, options: IFlagOptions<K>): ExtendProgramBuilderWithRequired<T, K, boolean>;
    build(): Program<T>;
    bind(action: ProgramMain<T>): ProgramWithAction<T>;
    static newBuilder(): ProgramBuilder<{}>;
}
