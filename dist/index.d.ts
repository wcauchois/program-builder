/**
 * See {@link @wcauchois/program-builder#ProgramBuilder}.
 *
 * @packageDocumentation
 */
import ProgramBuilder, { ExtendProgramBuilderWithRequired, ExtendProgramBuilderWithOptional } from "./lib/ProgramBuilder";
import { Arguments } from "./lib/arguments";
import ProgramBase, { IProgramBaseOptions } from "./lib/ProgramBase";
import { IPositionalArgumentMetadata, IOptionalValuedFlagOptions, Converter, IRequiredValuedFlagOptions, IBooleanFlagOptions, ProgramMain, IProgramMetadata, IValuedFlagCommonOptions, IValuedFlagMetadata, IAnyFlag, IBooleanFlagMetadata } from "./lib/types";
import ProgramWithAction from "./lib/ProgramWithAction";
import Program from "./lib/Program";
import ValuedFlag from "./lib/ValuedFlag";
import PositionalArguments from "./lib/PositionalArguments";
import BooleanFlag from "./lib/BooleanFlag";
import PositionalArgument from "./lib/PositionalArgument";
import { ProgramError, ArgumentError, FlagParseError, TooManyArgumentsError } from "./lib/errors";
import FlagDocumentation from "./lib/FlagDocumentation";
import TableWriter, { ITableWriterOptions } from "./lib/TableWriter";
import ProgramWithSubcommands from "./lib/ProgramWithSubcommands";
export { ProgramBuilder, Arguments, ProgramBase, IPositionalArgumentMetadata, ExtendProgramBuilderWithRequired, ExtendProgramBuilderWithOptional, IOptionalValuedFlagOptions, Converter, IRequiredValuedFlagOptions, IBooleanFlagOptions as IFlagOptions, ProgramMain, ProgramWithAction, Program, IProgramBaseOptions, ValuedFlag, PositionalArguments, BooleanFlag as Flag, IProgramMetadata, IValuedFlagCommonOptions, IBooleanFlagMetadata as IFlagMetadata, IAnyFlag, IValuedFlagMetadata, PositionalArgument, ProgramError, FlagParseError, ArgumentError, TooManyArgumentsError, FlagDocumentation, TableWriter, ITableWriterOptions, ProgramWithSubcommands };
