"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramWithAction_1 = __importDefault(require("./ProgramWithAction"));
const ProgramHelpers_1 = __importDefault(require("./ProgramHelpers"));
const errors_1 = require("./errors");
const TableWriter_1 = __importDefault(require("./TableWriter"));
function flattenSubcommandMap(map, path = []) {
    if (map instanceof ProgramWithAction_1.default) {
        return [[path, map]];
    }
    else {
        return Object.entries(map).flatMap(([key, value]) => flattenSubcommandMap(value, path.concat([key])));
    }
}
class ProgramWithSubcommands {
    /**
     * @internal
     */
    constructor(subcommandMap, metadata) {
        this.subcommandMap = subcommandMap;
        this.metadata = metadata;
        this.helpers = new ProgramHelpers_1.default();
    }
    generateHelpText() {
        let buffer = "";
        buffer += `Usage: ${this.helpers.getProgramName()} COMMAND [options]`;
        if (this.metadata.description) {
            buffer += `\n\n${this.metadata.description}`;
        }
        buffer += "\n\n";
        const allSubcommands = flattenSubcommandMap(this.subcommandMap);
        const tw = new TableWriter_1.default();
        for (const [subcommandNameParts, subcommand] of allSubcommands) {
            const row = [subcommandNameParts.join(" ")];
            const { description } = subcommand.programMetadata;
            if (description) {
                row.push(description);
            }
            tw.writeRow(row);
        }
        buffer += `Commands:\n${tw.toString()}`;
        return buffer;
    }
    determineSubcommand(args) {
        const argStack = args.slice();
        let currentMap = this.subcommandMap;
        let currentArg;
        const consumedArgs = [];
        while ((currentArg = argStack.shift())) {
            consumedArgs.push(currentArg);
            const mapValue = currentMap[currentArg];
            if (!mapValue) {
                throw new errors_1.UnrecognizedSubcommandError(consumedArgs);
            }
            else if (mapValue instanceof ProgramWithAction_1.default) {
                return [argStack, consumedArgs, mapValue];
            }
            else {
                currentMap = mapValue;
            }
        }
        throw new errors_1.UnrecognizedSubcommandError(consumedArgs);
    }
    async execOrThrow(rawArgs) {
        if (!rawArgs) {
            rawArgs = this.helpers.getProcessArgs();
        }
        if (rawArgs.length === 0) {
            throw new errors_1.UnspecifiedSubcommandError();
        }
        if (this.helpers.isHelpRequested(rawArgs)) {
            console.log(this.generateHelpText());
            return;
        }
        const [newArgs, subcommandParts, subcommand] = this.determineSubcommand(rawArgs);
        const extraUsage = subcommandParts.join(" ");
        await subcommand.execOrThrow(subcommand.action, newArgs, extraUsage);
    }
    exec(rawArgs) {
        this.helpers.execAndExit(() => this.execOrThrow(rawArgs));
    }
}
exports.default = ProgramWithSubcommands;
