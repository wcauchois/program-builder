import React from "react";
import CodeBlock from "@theme/CodeBlock";

const data = {"pos":{"invokeResults":[[[],"Not enough positional arguments were specified. Expected: at least 1"],[["hello","world"],"Args are: { foo: 'hello', bar: 'world' }"]]},"bool":{"invokeResults":[[[],"Args are: { verbose: false }"],[["-v"],"Args are: { verbose: true }"]]},"valued":{"invokeResults":[[[],"The following required flags were not specified: --count, --name"],[["--count","2","--name","bill"],"Args are: { count: 2, name: 'bill' }"],[["--count","invalid","--name","bob"],"Please provide a valid integer for '--count'. Received: invalid"]]},"desc":{"invokeResults":[[["-h"],"Usage: main.ts\n\nMy awesome program"]]}};

export function Invocations({ name }) {
  const { invokeResults } = data[name];
  const elems = [];
  elems.push(<p key="header"><em>Example invocations:</em></p>);
  for (let i = 0; i < invokeResults.length; i++) {
    const [args, output] = invokeResults[i];
    const codeBlockString = '$ ts-node main.ts ' + args.join(' ') + '\n' + output;
    elems.push(
      <div key={i} style={{ marginBottom: "var(--ifm-leading)" }}>
        <CodeBlock>{codeBlockString}</CodeBlock>
      </div>
    );
  }
  return <>{elems}</>;
}
