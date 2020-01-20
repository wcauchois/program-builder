"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const util = require("util");
class ProgramHelpers {
    isHelpRequested(args) {
        return args.length > 0 && ProgramHelpers.helpArgumentsSet.has(args[0]);
    }
    formatError(err) {
        if (typeof err.message === "string") {
            return err.message;
        }
        else if (typeof err === "string") {
            return err;
        }
        else {
            return util.inspect(err);
        }
    }
    getProcessArgs() {
        return process.argv.slice(2);
    }
    getProgramName() {
        return path.basename(process.argv[1]);
    }
    execAndExit(fn) {
        fn()
            .then(() => process.exit(0))
            .catch(err => {
            console.error(this.formatError(err));
            process.exit(1);
        });
    }
}
exports.default = ProgramHelpers;
ProgramHelpers.helpArgumentsSet = new Set(["-h", "--help"]);
