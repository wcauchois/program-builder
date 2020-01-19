import { IValuedFlagMetadata, Converter, IAnyFlag } from "./types";
export default class ValuedFlag implements IAnyFlag {
    readonly names: string[];
    readonly dest: string;
    readonly metadata: IValuedFlagMetadata;
    readonly converter: Converter<any>;
    readonly order: number;
    constructor(names: string[], dest: string, converter: Converter<any>, metadata: IValuedFlagMetadata, order: number);
    get firstName(): string;
    generateHelpColumns(): string[];
}
