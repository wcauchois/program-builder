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

export function isFlag(arg: string) {
  return arg.startsWith("-");
}

export function expectUnreachable(x: never) {}

export function rightPad(s: string, n: number) {
  let r = s;
  while (r.length < n) {
    r = r + " ";
  }
  return r;
}
