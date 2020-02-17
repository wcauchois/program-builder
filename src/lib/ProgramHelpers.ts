import path = require("path");

export default class ProgramHelpers {
  static readonly helpArgumentsSet = new Set(["-h", "--help"]);

  isHelpRequested(args: string[]) {
    return args.length > 0 && ProgramHelpers.helpArgumentsSet.has(args[0]);
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
        console.error(err);
        process.exit(1);
      });
  }
}
