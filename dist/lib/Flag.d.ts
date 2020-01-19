import { IFlagMetadata, IAnyFlag } from "./types";
import FlagDocumentation from "./FlagDocumentation";
export default class Flag implements IAnyFlag {
    readonly dest: string;
    readonly positiveNames: string[];
    readonly negativeNames: string[];
    readonly default: boolean;
    readonly metadata: IFlagMetadata;
    readonly order: number;
    constructor(dest: string, positiveNames: string[], negativeNames: string[], theDefault: boolean, metadata: IFlagMetadata, order: number);
    isPositiveName(name: string): boolean;
    get allNames(): string[];
    getDocumentation(): FlagDocumentation;
}
