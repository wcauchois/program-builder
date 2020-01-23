/**
 * See {@link @wcauchois/program-builder#ProgramBuilder}.
 *
 * @packageDocumentation
 */
import ProgramBuilder, { ExtendProgramBuilderWithRequired, ExtendProgramBuilderWithOptional } from "./lib/ProgramBuilder";
import { Arguments } from "./lib/arguments";
import ProgramBase, { IProgramBaseOptions } from "./lib/ProgramBase";
import { IPositionalArgumentMetadata, INullableValuedFlagOptions, Converter, INonNullValuedFlagOptions, IBooleanFlagOptions, ProgramMain, IProgramMetadata, IValuedFlagCommonOptions, IValuedFlagMetadata, IAnyFlag, IBooleanFlagMetadata, IProgramWithSubcommandsMetadata } from "./lib/types";
import ProgramWithAction from "./lib/ProgramWithAction";
import Program from "./lib/Program";
import ValuedFlag from "./lib/ValuedFlag";
import PositionalArguments from "./lib/PositionalArguments";
import BooleanFlag from "./lib/BooleanFlag";
import PositionalArgument from "./lib/PositionalArgument";
import { ProgramError, ArgumentError, FlagParseError, TooManyArgumentsError, UnrecognizedSubcommandError } from "./lib/errors";
import FlagDocumentation from "./lib/FlagDocumentation";
import TableWriter, { ITableWriterOptions } from "./lib/TableWriter";
import ProgramWithSubcommands, { ProgramSubcommandMap } from "./lib/ProgramWithSubcommands";
export { ProgramBuilder, Arguments, ProgramBase, IPositionalArgumentMetadata, ExtendProgramBuilderWithRequired, ExtendProgramBuilderWithOptional, INullableValuedFlagOptions, Converter, INonNullValuedFlagOptions, IBooleanFlagOptions, ProgramMain, ProgramWithAction, Program, IProgramBaseOptions, ValuedFlag, PositionalArguments, BooleanFlag, IProgramMetadata, IValuedFlagCommonOptions, IBooleanFlagMetadata, IAnyFlag, IValuedFlagMetadata, PositionalArgument, ProgramError, FlagParseError, ArgumentError, TooManyArgumentsError, FlagDocumentation, TableWriter, ITableWriterOptions, ProgramWithSubcommands, UnrecognizedSubcommandError, ProgramSubcommandMap, IProgramWithSubcommandsMetadata };
