import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FlightInput from "../FlightInput";

jest.mock("react-hook-form", () => ({
  useFormContext: () => ({
    watch: jest.fn(),
    formState: { errors: {} },
    setValue: jest.fn((name, value) => ({ [name]: value })), // Mock setValue to handle setting values
  }),
}));

const locations = [
  { value: "1", label: "Location 1" },
  { value: "2", label: "Location 2" },
];

describe("FlightInput component", () => {
  test("renders with placeholder", () => {
    render(
      <FlightInput
        placeholder="Select a location"
        locations={locations}
        name="location"
      />
    );

    expect(screen.getByText("Select a location")).toBeInTheDocument();
  });
});
