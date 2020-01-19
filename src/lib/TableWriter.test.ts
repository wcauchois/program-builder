import TableWriter from "./TableWriter";

it("Wraps a table", () => {
  const tw = new TableWriter();
  tw.writeRow([
    "hi",
    `Long line that should get wrapped. Long line that should get wrapped. Long line that should get wrapped. Long line that should get wrapped.`
  ]);
  tw.writeRow(["again", "hi again"]);
  expect(tw.toString())
    .toEqual(`  hi     Long line that should get wrapped. Long line that should get
         wrapped. Long line that should get wrapped. Long line that
         should get wrapped.
  again  hi again`);
});
