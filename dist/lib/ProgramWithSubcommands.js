"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramWithSubcommands {
    constructor(subcommandMap) {
        this.subcommandMap = subcommandMap;
    }
    async execOrThrow(rawArgs) { }
    exec(rawArgs) { }
}
exports.default = ProgramWithSubcommands;
