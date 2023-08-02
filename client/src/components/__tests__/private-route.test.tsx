import { useQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { PrivateRoute } from "../private-route";

vi.mock("@tanstack/react-query");
vi.mock("react-router-dom");

beforeEach(() => {
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});

afterEach(() => {
  vi.mocked(window.requestAnimationFrame).mockRestore();
});

test("shows a loading screen while the user object is being fetched", () => {
  vi.mocked(useQuery, { partial: true }).mockReturnValueOnce({
    isLoading: true,
  });
  render(<PrivateRoute children="test child" />);
  expect(screen.getByRole("progressbar")).toBeInTheDocument();
  expect(screen.queryByText(/test child/i)).not.toBeInTheDocument();
});

test("redirects to login page if no user is found", () => {
  const navigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValueOnce(navigate);
  vi.mocked(useQuery, { partial: true }).mockReturnValueOnce({
    data: undefined,
  });
  render(<PrivateRoute />);
  expect(navigate).toBeCalledWith("/auth/login", { replace: true });
});

test("redirects to waitlist page if no user is not activated", () => {
  const navigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValueOnce(navigate);
  vi.mocked(useQuery, { partial: true }).mockReturnValueOnce({
    data: { active: false },
  });
  render(<PrivateRoute />);
  expect(navigate).toBeCalledWith("/auth/waitlist", { replace: true });
});

test("render child component if user is activated", () => {
  vi.mocked(useQuery, { partial: true }).mockReturnValueOnce({
    data: { active: true },
  });
  render(<PrivateRoute children="test child" />);
  expect(screen.getByText(/test child/i)).toBeInTheDocument();
});
