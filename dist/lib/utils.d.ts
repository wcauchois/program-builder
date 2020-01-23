export declare function validInt(s: string): boolean;
export declare function validFloat(s: string): boolean;
/**
 * Transform a type with optional properties into a new type where all the properties exist,
 * but the optional properties on the original type may be undefined on the new one.
 *
 * This can be handy for object literals, where it's required for non-optional fields to be
 * explicitly specified.
 *
 * From https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585
 */
export declare type Complete<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : T[P] | undefined;
};
export declare function isFlag(arg: string): boolean;
export declare function expectUnreachable(x: never): void;
export declare function rightPad(s: string, n: number): string;
export declare function getSurroundingChars(required: boolean): [string, string];
