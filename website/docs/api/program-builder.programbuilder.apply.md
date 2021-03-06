---
id: program-builder.programbuilder.apply
title: ProgramBuilder.apply() method
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@wcauchois/program-builder](./program-builder.md) &gt; [ProgramBuilder](./program-builder.programbuilder.md) &gt; [apply](./program-builder.programbuilder.apply.md)

## ProgramBuilder.apply() method

Apply a function to this program builder. This can be used to factor out common argument patterns.

<b>Signature:</b>

```typescript
apply<U extends T>(fn: (builder: ProgramBuilder<T>) => ProgramBuilder<U>): ProgramBuilder<U>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  fn | <code>(builder: ProgramBuilder&lt;T&gt;) =&gt; ProgramBuilder&lt;U&gt;</code> |  |

<b>Returns:</b>

`ProgramBuilder<U>`
