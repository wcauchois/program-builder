import ValuedFlag from "./ValuedFlag";
import BooleanFlag from "./BooleanFlag";
export default class Flags {
    readonly booleanFlags: BooleanFlag[];
    readonly valuedFlags: ValuedFlag[];
    constructor(booleanFlags: BooleanFlag[], valuedFlags: ValuedFlag[]);
}
