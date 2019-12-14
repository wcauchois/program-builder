import Program from "./Program";

export type Arguments<T> = T extends Program<infer U> ? U : never;
