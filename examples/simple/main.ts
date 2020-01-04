import { ProgramBuilder, Arguments } from "../../src";

const program = ProgramBuilder.newBuilder()
  .arg('filename', { description: `A file name` })
  .optionalArg('extraFilename', { description: `An additional optional file name`})
  .intFlag('--count,-c', { dest: 'count', default: 0, description: `A count` })
  .intFlag('--requiredCount', { dest: 'requiredCount', description: `A count that is required` })
  .build();

function main(args: Arguments<typeof program>) {
  console.log('My arguments are:');
  console.log(JSON.stringify(args, null, 2));
}

program.exec(main);
