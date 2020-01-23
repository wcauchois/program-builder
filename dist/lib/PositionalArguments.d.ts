import PositionalArgument from "./PositionalArgument";
export default class PositionalArguments {
    readonly required: PositionalArgument[];
    readonly optional: PositionalArgument[];
    constructor();
    push(arg: PositionalArgument): void;
    pushOptional(arg: PositionalArgument): void;
    get nonEmpty(): boolean;
    getSpecForUsage(): string;
    get haveAnyDescription(): boolean;
    get all(): PositionalArgument[];
}
