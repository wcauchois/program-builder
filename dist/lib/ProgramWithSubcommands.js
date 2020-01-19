"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgramWithSubcommands {
    /**
     * @internal
     */
    constructor(subcommandMap) {
        this.subcommandMap = subcommandMap;
    }
    async execOrThrow(rawArgs) { }
    exec(rawArgs) { }
}
exports.default = ProgramWithSubcommands;
