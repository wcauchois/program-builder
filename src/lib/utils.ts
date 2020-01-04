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

/**
 * Get all the argument types for a potentially overloaded function.
 *
 * https://stackoverflow.com/a/52761156/1480571
 */
type OverloadedArguments<T> = T extends {
  (...args: infer A1): any;
  (...args: infer A2): any;
  (...args: infer A3): any;
  (...args: infer A4): any;
}
  ? A1 | A2 | A3 | A4
  : T extends {
      (...args: infer A1): any;
      (...args: infer A2): any;
      (...args: infer A3): any;
    }
  ? A1 | A2 | A3
  : T extends { (...args: infer A1): any; (...args: infer A2): any }
  ? A1 | A2
  : T extends (...args: infer A) => any
  ? A
  : any;

/**
 * Changes the return type of a function.
 *
 * https://stackoverflow.com/a/50014868/1480571
 */
export type ReplaceReturnType<T, TNewReturn> = (
  ...args: OverloadedArguments<T>
) => TNewReturn;

export function isFlag(arg: string) {
  return arg.startsWith("-");
}
