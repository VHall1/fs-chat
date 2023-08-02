import { render, screen } from "@testing-library/react";
import { Loading } from "../loading";

test("renders a loading screen", () => {
  render(<Loading />);
  expect(screen.getByRole("progressbar")).toBeTruthy();
});
