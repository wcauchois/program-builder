import Program from "./Program";
import { ProgramMain } from "./types";
import { IProgramBaseOptions } from "./ProgramBase";

export default class ProgramWithAction<T> extends Program<T> {
  readonly action: ProgramMain<T> | undefined;

  constructor(
    options: IProgramBaseOptions,
    action: ProgramMain<T> | undefined
  ) {
    super(options);
    this.action = action;
  }
}
