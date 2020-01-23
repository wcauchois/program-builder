import { IValuedFlagMetadata, Converter, IAnyFlag } from "./types";
import FlagDocumentation from "./FlagDocumentation";
export default class ValuedFlag implements IAnyFlag {
    readonly names: string[];
    readonly dest: string;
    readonly metadata: IValuedFlagMetadata;
    readonly converter: Converter<any>;
    readonly order: number;
    get default(): any;
    get required(): boolean;
    constructor(names: string[], dest: string, converter: Converter<any>, metadata: IValuedFlagMetadata, order: number);
    get firstName(): string;
    getDocumentation(): FlagDocumentation;
}
