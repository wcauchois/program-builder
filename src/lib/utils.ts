const intRegex = /^-?[0-9]+$/;

export function validInt(s: string) {
  return intRegex.test(s);
}

export function validFloat(s: string) {
  return !isNaN(parseFloat(s));
}

/**
 * Transform a type with optional properties into a new type where all the properties exist,
 * but the optional properties on the original type may be undefined on the new one.
 *
 * This can be handy for object literals, where it's required for non-optional fields to be
 * explicitly specified.
 *
 * From https://medium.com/terria/typescript-transforming-optional-properties-to-required-properties-that-may-be-undefined-7482cb4e1585
 */
export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

export type ArgumentTypes<T> = T extends (...args: infer U) => infer R
  ? U
  : never;

/**
 * Changes the return type of a function.
 *
 * https://stackoverflow.com/a/50014868/1480571
 */
export type ReplaceReturnType<T, TNewReturn> = (
  ...a: ArgumentTypes<T>
) => TNewReturn;

export function isFlag(arg: string) {
  return arg.startsWith("-");
}
