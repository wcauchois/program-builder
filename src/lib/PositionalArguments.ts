import PositionalArgument from "./PositionalArgument";

export default class PositionalArguments {
  readonly required: PositionalArgument[];
  readonly optional: PositionalArgument[];

  constructor() {
    this.required = [];
    this.optional = [];
  }

  push(arg: PositionalArgument) {
    this.required.push(arg);
  }

  pushOptional(arg: PositionalArgument) {
    this.optional.push(arg);
  }
}
