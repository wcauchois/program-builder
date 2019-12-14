export default class PositionalArgument {
    readonly dest: string;
    readonly index: number;
    readonly required: boolean;
    constructor(dest: string, index: number, required: boolean);
}
