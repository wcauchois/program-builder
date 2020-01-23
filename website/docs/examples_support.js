// DO NOT EDIT!
// This file code generated by the generateExampleInvocations.js script.

import React from "react";
import CodeBlock from "@theme/CodeBlock";

const data = {"pos":{"invokeResults":[[[],"Not enough positional arguments were specified. Expected: at least 1"],[["hello"],"Args are: { foo: 'hello', bar: null }"],[["hello","world"],"Args are: { foo: 'hello', bar: 'world' }"]]},"bool":{"invokeResults":[[[],"Args are: { verbose: false }"],[["-v"],"Args are: { verbose: true }"]]},"valued":{"invokeResults":[[[],"The following required flags were not specified: --count, --name"],[["--count","2","--name","bill"],"Args are: { count: 2, name: 'bill' }"],[["--count","invalid","--name","bob"],"Please provide a valid integer for '--count'. Received: invalid"]]},"opt_vs_required":{"invokeResults":[[[],"The following required flags were not specified: -a"],[["-a","1"],"Args are: { a: 1, b: 0, c: null }"],[["-h"],"Usage: main.ts [options]\n\nOptions:\n  -a <a>  \n  -b [b]  \n  -c [c]"]]},"desc":{"invokeResults":[[["-h"],"Usage: main.ts [options] <filename> [optarg]\n\nMy awesome program\n\nArguments:\n  filename  Awesome description of a filename\n  optarg    This argument is optional (optional)\n\nOptions:\n  --enable, --enable    Awesome description of the --enable flag\n  --longboi, --longboi  Text is automatically wrapped. Text is automatically\n                        wrapped. Text is automatically wrapped. Text is\n                        automatically wrapped."]]},"custom":{"invokeResults":[[["--jsonInput","{\"hello\": \"world\"}"],"Args are: { json: { hello: 'world' } }"]]},"subcommand":{"invokeResults":[[["-h"],"Usage: main.ts COMMAND [options]\n\nA description of my subcommand\n\nCommands:\n  generate        Generate something\n  clean           Clean the output directory\n  this is nested"],[["generate","-h"],"Usage: main.ts generate <filename>\n\nGenerate something"],[["generate","foo.txt"],"Generating to foo.txt"],[["this","is","nested","-h"],"Usage: main.ts this is nested [options]\n\nOptions:\n  -x, -x"],[["this","is","nested","-x"],"This is a nested subcommand true"]]}};

export function Invocations({ name }) {
  const { invokeResults } = data[name];
  const elems = [];
  elems.push(<p key="header"><em>Example invocations:</em></p>);
  for (let i = 0; i < invokeResults.length; i++) {
    const [args, output] = invokeResults[i];
    const codeBlockString = '$ ts-node main.ts ' + args.map(a => a.includes(' ') ? `'${a}'` : a).join(' ') + '\n' + output;
    elems.push(
      <div key={i} style={{ marginBottom: "var(--ifm-leading)" }}>
        <CodeBlock>{codeBlockString}</CodeBlock>
      </div>
    );
  }
  return <>{elems}</>;
}