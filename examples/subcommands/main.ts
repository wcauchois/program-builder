import { ProgramBuilder, Arguments } from "../../src";

function generateMain(args: Arguments<typeof generate>) {
  console.log(`Generating to ${args.filename}`);
}

function cleanMain(args: Arguments<typeof clean>) {
  console.log('Cleaning output directory');
}

function nestedMain(args: Arguments<typeof nested>) {
  console.log(`This is a nested subcommand ${args.x}`);
}

const generate = ProgramBuilder.newBuilder()
  .description(`Generate something`)
  .arg('filename')
  .bind(generateMain);

const clean = ProgramBuilder.newBuilder()
  .description('Clean the output directory')
  .bind(cleanMain);

const nested = ProgramBuilder.newBuilder()
  .flag('-x', { dest: 'x' })
  .bind(nestedMain);

const program = ProgramBuilder.buildWithSubcommands({
  generate,
  clean,
  this: {
    is: {
      nested
    }
  }
});

program.exec();
