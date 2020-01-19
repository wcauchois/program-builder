import ProgramBuilder from "./ProgramBuilder";

it(`Builds and executes a simple program`, async () => {
  const program = ProgramBuilder.newBuilder()
    .intFlag("--count", { dest: "count" })
    .build();
  let gotCount = 0;
  await program.execOrThrow(
    args => {
      gotCount = args.count;
    },
    ["--count", "22"]
  );
  expect(gotCount).toEqual(22);
});
