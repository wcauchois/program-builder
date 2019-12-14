import { ProgramBuilder, Arguments } from "../..";

const program = ProgramBuilder.newProgram()
  .intArg('count', '--count', {})
  .build();

function main(args: Arguments<typeof program>) {
  console.log('count is', args.count);
}

program.exec(main);
