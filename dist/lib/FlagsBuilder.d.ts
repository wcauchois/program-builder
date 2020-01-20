export default class FlagsBuilder<T, ThisT extends FlagsBuilder<T, any>> {
    blah(): ThisT<T & {
        foo: string;
    }>;
}
