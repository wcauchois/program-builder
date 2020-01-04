import { IProgramMetadata } from "./types";
import KeywordArgument from "./KeywordArgument";
import PositionalArguments from "./PositionalArguments";
import Flag from "./Flag";

export interface IProgramBaseOptions {
  keywordArguments: KeywordArgument[];
  positionalArguments: PositionalArguments;
  flags: Flag[];
  programMetadata: IProgramMetadata;
}

export default abstract class ProgramBase implements IProgramBaseOptions {
  readonly keywordArguments: KeywordArgument[];
  readonly positionalArguments: PositionalArguments;
  readonly flags: Flag[];
  readonly programMetadata: IProgramMetadata;

  constructor({
    keywordArguments,
    positionalArguments,
    flags,
    programMetadata
  }: IProgramBaseOptions) {
    this.keywordArguments = keywordArguments;
    this.positionalArguments = positionalArguments;
    this.flags = flags;
    this.programMetadata = programMetadata;
  }
}
