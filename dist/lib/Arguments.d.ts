import Program from "./Program";
/**
 * Type helper to get the Arguments type of a {@link Program}.
 *
 * @remarks
 * Use TypeScript's `typeof` operator to get the type of your `program` variable,
 * then pass it as a type argument to this type to get the arguments type
 * for your program.
 *
 * Note you can use `typeof` before a variable is declared, in case you want to
 * define your main function before your program-building for readability.
 *
 * Example:
 *
 * ```typescript
 * async function main(args: Arguments<typeof Program>) {
 *   // Do things with args
 * }
 * const program = ProgramBuilder.newBuilder().build();
 * ```
 */
export declare type Arguments<T> = T extends Program<infer U> ? U : never;
