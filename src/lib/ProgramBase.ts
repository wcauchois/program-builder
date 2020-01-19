import { IProgramMetadata } from "./types";
import ValuedFlag from "./ValuedFlag";
import PositionalArguments from "./PositionalArguments";
import BooleanFlag from "./BooleanFlag";

export interface IProgramBaseOptions {
  valuedFlags: ValuedFlag[];
  positionalArguments: PositionalArguments;
  booleanFlags: BooleanFlag[];
  programMetadata: IProgramMetadata;
}

export default abstract class ProgramBase implements IProgramBaseOptions {
  readonly valuedFlags: ValuedFlag[];
  readonly positionalArguments: PositionalArguments;
  readonly booleanFlags: BooleanFlag[];
  readonly programMetadata: IProgramMetadata;

  constructor({
    valuedFlags,
    positionalArguments,
    booleanFlags,
    programMetadata
  }: IProgramBaseOptions) {
    this.valuedFlags = valuedFlags;
    this.positionalArguments = positionalArguments;
    this.booleanFlags = booleanFlags;
    this.programMetadata = programMetadata;
  }
}
