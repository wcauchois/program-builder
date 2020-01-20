import path = require("path");
import util = require("util");

export default class ProgramHelpers {
  static readonly helpArgumentsSet = new Set(["-h", "--help"]);

  isHelpRequested(args: string[]) {
    return args.length > 0 && ProgramHelpers.helpArgumentsSet.has(args[0]);
  }

  formatError(err: any) {
    if (typeof err.message === "string") {
      return err.message;
    } else if (typeof err === "string") {
      return err;
    } else {
      return util.inspect(err);
    }
  }

  getProcessArgs() {
    return process.argv.slice(2);
  }

  getProgramName() {
    return path.basename(process.argv[1]);
  }

  execAndExit(fn: () => Promise<void>) {
    fn()
      .then(() => process.exit(0))
      .catch(err => {
        console.error(this.formatError(err));
        process.exit(1);
      });
  }
}
