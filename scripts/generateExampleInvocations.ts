import path = require("path");
import fs = require("fs");
import escapeStringRegexp = require("escape-string-regexp");
import child_process = require("child_process");

const repoRoot = path.join(__dirname, "..");

const examplesFilePath = path.join(repoRoot, "website/docs/examples.mdx");

const Regexes = {
  invoke: new RegExp(
    "^" +
      escapeStringRegexp("<>{/* #invoke") +
      "\\(([a-zA-Z0-9_]+)\\):\\s+(.*?)\\s+" +
      escapeStringRegexp("*/}</>") +
      "$"
  ),
  startCodeBlock: new RegExp("^" + escapeStringRegexp("```typescript") + "$"),
  endCodeBlock: new RegExp("^" + escapeStringRegexp("```") + "$")
};

interface ExampleAndInvocations {
  codeBlockName: string;
  sourceCode: string;
  invocations: string[][];
}

const examplesFileContent = fs.readFileSync(examplesFilePath, {
  encoding: "utf-8"
});

type ParseState =
  | {
      kind: "Default";
    }
  | {
      kind: "HaveInvocations";
      codeBlockName: string;
      invocations: string[][];
    }
  | {
      kind: "ReadingCodeBlock";
      codeBlockName: string;
      invocations: string[][];
      linesSoFar: string[];
    };

let state: ParseState = { kind: "Default" };

const items: ExampleAndInvocations[] = [];

const lines = examplesFileContent.split("\n");
for (const line of lines) {
  if (state.kind === "Default") {
    const match = line.match(Regexes.invoke);
    if (match) {
      const [, codeBlockName, invokeContents] = match;
      const invocations = JSON.parse(invokeContents);
      state = { kind: "HaveInvocations", invocations, codeBlockName };
    }
  } else if (state.kind === "HaveInvocations") {
    if (Regexes.startCodeBlock.test(line)) {
      state = {
        kind: "ReadingCodeBlock",
        invocations: state.invocations,
        codeBlockName: state.codeBlockName,
        linesSoFar: []
      };
    }
  } else if (state.kind === "ReadingCodeBlock") {
    if (Regexes.endCodeBlock.test(line)) {
      items.push({
        codeBlockName: state.codeBlockName,
        invocations: state.invocations,
        sourceCode: state.linesSoFar.join("\n")
      });
      state = { kind: "Default" };
    } else {
      state.linesSoFar.push(line);
    }
  }
}

const TEMP_FILE_NAME = "__gen_example_helper__.ts";

function tsNode(sourceCode: string, args: string[]): string {
  const binaryPath = path.join(repoRoot, "node_modules/.bin/ts-node");
  const finalSourceCode = `\
import { ProgramBuilder, Arguments, Converter } from "./src";

${sourceCode}
`;
  fs.writeFileSync(path.join(repoRoot, TEMP_FILE_NAME), finalSourceCode);
  const finalArgs = [TEMP_FILE_NAME].concat(args);
  try {
    const output = child_process.execFileSync(binaryPath, finalArgs, {
      cwd: repoRoot,
      stdio: ["pipe", "pipe", "pipe"]
    });
    return output.toString("utf-8").trim();
  } catch (err) {
    return err.stderr.toString("utf-8").trim();
  }
}

const resultJson: any = {};
const totalInvocations = items.flatMap(item => item.invocations).length;
let invocationsSoFar = 0;

for (const item of items) {
  const invokeResults: Array<[string[], string]> = [];
  for (const invocation of item.invocations) {
    console.error(`${invocationsSoFar++}/${totalInvocations}`); // Progress
    const result = tsNode(item.sourceCode, invocation).replace(
      "__gen_example_helper__.ts",
      "main.ts"
    );
    invokeResults.push([invocation, result]);
  }

  resultJson[item.codeBlockName] = {
    invokeResults
  };
}

console.log();
console.log(JSON.stringify(resultJson, null, 2));

const supportFilePath = path.join(repoRoot, "website/docs/examples_support.js");

const supportFileContents = `\
// DO NOT EDIT!
// This file code generated by the generateExampleInvocations.js script.

import React from "react";
import CodeBlock from "@theme/CodeBlock";

const data = ${JSON.stringify(resultJson)};

export function Invocations({ name }) {
  const { invokeResults } = data[name];
  const elems = [];
  elems.push(<p key="header"><em>Example invocations:</em></p>);
  for (let i = 0; i < invokeResults.length; i++) {
    const [args, output] = invokeResults[i];
    const codeBlockString = '$ ts-node main.ts ' + args.map(a => a.includes(' ') ? \`'\${a}'\` : a).join(' ') + '\\n' + output;
    elems.push(
      <div key={i} style={{ marginBottom: "var(--ifm-leading)" }}>
        <CodeBlock>{codeBlockString}</CodeBlock>
      </div>
    );
  }
  return <>{elems}</>;
}
`;

fs.writeFileSync(supportFilePath, supportFileContents);