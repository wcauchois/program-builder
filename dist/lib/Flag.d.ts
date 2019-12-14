import { IFlag } from "./types";
export default class Flag implements IFlag {
    readonly dest: string;
    readonly positiveNames: string[];
    readonly negativeNames: string[];
    constructor(dest: string, positiveNames: string[], negativeNames: string[]);
}
