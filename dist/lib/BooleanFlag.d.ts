import { IBooleanFlagMetadata, IAnyFlag } from "./types";
import FlagDocumentation from "./FlagDocumentation";
export default class BooleanFlag implements IAnyFlag {
    readonly dest: string;
    readonly positiveNames: string[];
    readonly negativeNames: string[];
    readonly default: boolean;
    readonly metadata: IBooleanFlagMetadata;
    readonly order: number;
    constructor(dest: string, positiveNames: string[], negativeNames: string[], theDefault: boolean, metadata: IBooleanFlagMetadata, order: number);
    isPositiveName(name: string): boolean;
    get allNames(): string[];
    getDocumentation(): FlagDocumentation;
}
