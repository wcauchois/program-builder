---
id: program-builder.programbuilder.flag
title: ProgramBuilder.flag() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@wcauchois/program-builder](./program-builder.md) &gt; [ProgramBuilder](./program-builder.programbuilder.md) &gt; [flag](./program-builder.programbuilder.flag.md)

## ProgramBuilder.flag() method

Add a boolean-valued flag to the program (sometimes known as a "switch").

<b>Signature:</b>

```typescript
flag<K extends string>(name: string, options: IBooleanFlagOptions<K>): ExtendProgramBuilderWithRequired<T, K, boolean>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  name | <code>string</code> | The name for the flag, including leading dashes. Multiple alternative names may be specified by separating them within the string by commas. For example, <code>&quot;-i,--input&quot;</code>. |
|  options | <code>IBooleanFlagOptions&lt;K&gt;</code> | See [IBooleanFlagOptions](./program-builder.ibooleanflagoptions.md)<!-- -->. |

<b>Returns:</b>

`ExtendProgramBuilderWithRequired<T, K, boolean>`
