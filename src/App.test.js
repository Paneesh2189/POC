import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("check installed tab is shown", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Installed/i);
  expect(linkElement).toBeInTheDocument();
});
