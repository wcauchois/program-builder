---
id: program-builder.ioptionalvaluedflagoptions
title: IOptionalValuedFlagOptions interface
hide_title: true
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[@wcauchois/program-builder](./program-builder.md) &gt; [IOptionalValuedFlagOptions](./program-builder.ioptionalvaluedflagoptions.md)

## IOptionalValuedFlagOptions interface

Extend [IValuedFlagCommonOptions](./program-builder.ivaluedflagcommonoptions.md) with the default value for a flag.

<b>Signature:</b>

```typescript
export interface IOptionalValuedFlagOptions<K extends string, V> extends IValuedFlagCommonOptions<K> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [default](./program-builder.ioptionalvaluedflagoptions.default.md) | <code>V</code> | The default value for the flag. |