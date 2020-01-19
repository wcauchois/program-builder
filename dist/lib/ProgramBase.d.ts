import { IProgramMetadata } from "./types";
import ValuedFlag from "./ValuedFlag";
import PositionalArguments from "./PositionalArguments";
import Flag from "./Flag";
export interface IProgramBaseOptions {
    valuedFlags: ValuedFlag[];
    positionalArguments: PositionalArguments;
    flags: Flag[];
    programMetadata: IProgramMetadata;
}
export default abstract class ProgramBase implements IProgramBaseOptions {
    readonly valuedFlags: ValuedFlag[];
    readonly positionalArguments: PositionalArguments;
    readonly flags: Flag[];
    readonly programMetadata: IProgramMetadata;
    constructor({ valuedFlags, positionalArguments, flags, programMetadata }: IProgramBaseOptions);
}
