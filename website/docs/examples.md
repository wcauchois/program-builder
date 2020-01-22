---
id: examples
title: Examples
sidebar_label: Examples
---

# Table of Contents

# Introduction

This document specifies examples of using ProgramBuilder that should exemplify common use-cases.

Sometimes an example invocation is presented using [ts-node](https://github.com/TypeStrong/ts-node)
and assuming that the main file is called `main.ts`.

import { Invocations } from "./examples_support";

# Specifying your main function ahead of your builder

If you call `program.exec` with a lambda, its `args` argument will automatically assume
the correct type of the program's arguments.

However, if you want to specify your main function separately, you must use the
`Arguments<T>` type helper and pass `typeof program`.

`typeof` returns the TypeScript type of a variable, and the `Arguments` helper
(part of ProgramBuilder) unwraps the arguments type from a `Program` object.

```typescript
function main(args: Arguments<typeof program>) {
  // Do stuff
}

const program = ProgramBuilder.newBuilder().build();
program.exec(main);
```

# Positional arguments

Positional arguments are specified using the `.arg` or `.optionalArg` methods.

The first argument is the destination key into which the argument value will be stored.

`.arg` is used to specify required arguments. If not enough required arguments are provided
to the program, it will exit with a non-zero code.

<>{/* invoke(pos): [[], ["hello", "world"]] */}</>

```typescript
const program = ProgramBuilder.newBuilder()
  .arg("foo")
  .optionalArg("bar")
  .build();

program.exec(args => {
  // args: { foo: string, bar: string | undefined }
  console.log('Args are:', args);
});
```

<Invocations name="pos" />

# Promise-returning main functions

The function that you pass to `exec` can be an `async` or Promise-returning function.

If your function returns a Promise, it will be properly awaited on and if it throws an
error that error will be output and the process will return a non-zero exit code.

```typescript
const program = ProgramBuilder.newBuilder().build();

program.exec(async args => {
  await someHTTPCall();
});
```

# Boolean flags

Use `.flag()` to specify a boolean flag. The first argument is the name of the flag,
including leading dashes (ex: `"--count"`).

Multiple names can be specified by separating them with commas within the same string
(ex: `"-c,--count"`).

The second argument is a list of options for the flag. The only required one of these
is `dest`, which indicates where to store the flag value within the arguments object
that is passed to your main function.

<>{/* invoke(bool): [[], ["-v"]] */}</>

```typescript
const program = ProgramBuilder.newBuilder()
  .flag("-v,--verbose", { dest: "verbose" })
  .build();

program.exec(args => {
  // args: { verbose: boolean }
  console.log('Args are:', args)
});
```

<Invocations name="bool" />

# Valued flags

Flags can also take on a value, which the user specifies by providing a string
immediately succeeding the flag on the commandline.

Valued flags are specified by calling one of several methods that are specialized
to the desired type of the flag: string, integer, etc.

The typed value is then stored in the specified `dest`.

<>{/* invoke(valued): [[], ["--count", "2", "--name", "bill"], ["--count", "invalid", "--name", "bob"]] */}</>

```typescript
const program = ProgramBuilder.newBuilder()
  .intFlag("--count", { dest: "count" })
  .stringFlag("--name", { dest: "name" })
  .build();

program.exec(args => {
  // args: { count: number, name: string }
  console.log('Args are:', args);
});
```

<Invocations name="valued" />

The current types of valued flags are:

- [`stringFlag`](api/program-builder.programbuilder.stringflag.md)
- [`intFlag`](api/program-builder.programbuilder.intflag.md)
- [`floatFlag`](api/program-builder.programbuilder.floatflag.md)
- [`customFlag`](api/program-builder.programbuilder.customflag.md) – allows you to provide your own
  converter function from a string to your custom type.

# Optional vs Required Flags

Valued flags are required unless a `default` is specified. If a required flag
isn't provided, the program will exit with a non-zero return code. Required flags
will be typed as non-undefined, whereas optional flags will be typed as `type | undefined`.

```typescript
const program = ProgramBuilder.newBuilder()
  .intFlag("--count", { dest: "count" })
  .intFlag("--optionalCount", { dest: "optionalCount", default: 0 })
  .build();

program.exec(args => {
  // args: { count: number, name: string }
  console.log('Args are:', args);
});
```

# Adding a Description

Call [`.description()`](api/program-builder.programbuilder.description.md) on a ProgramBuilder
to set the program's description to be used in help text generation.

<>{/* invoke(desc): [["-h"]] */}</>

```typescript
const program = ProgramBuilder.newBuilder()
  .description(`My awesome program`)
  .build();

program.exec(() => {});
```

<Invocations name="desc" />

# Subcommands

Use `ProgramBuilder.buildWithSubcommands` to create a program with multiple sub-commands.
This accepts a map from subcommand name to a `ProgramWithAction` representing the subcommand
flags and the action to be performed when executing the subcommand.

A `ProgramWithAction` can be created by calling `.bind()` on a `ProgramBuilder` instead of
`.build()`. `.bind()` accepts a `MainFunction` as its argument, indicating the function to be
called when that subcommand is specified.

The map can be multiply nested, for subcommands that have child-subcommands which are separated
by spaces. For example `{nested: {subcommand: someProgram}}` would result in a subcommand named
`"nested subcommand"`.

```typescript
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

// Execute the program. Note this doesn't take a main function, like
// a normal Program.exec().
program.exec();
```
