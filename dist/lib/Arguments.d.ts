import Program from "./Program";
export declare type Arguments<T> = T extends Program<infer U> ? U : never;
