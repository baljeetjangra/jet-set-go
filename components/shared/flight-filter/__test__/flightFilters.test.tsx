import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import FlightFilters from "../FlightFilters";

const airlines = [
  { airlineCode: "A", airlineName: "air india", flightNumber: "abc" },
  { airlineCode: "J", airlineName: "jet spice", flightNumber: "abcd" },
];

const onFilterChangeMock = jest.fn();

describe("FlightFilters component", () => {
  test("renders with filter options", async () => {
    render(
      <FlightFilters airlines={airlines} onFilterChange={onFilterChangeMock} />
    );

    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));

    expect(
      screen.getByText("Smart Searching with Filters")
    ).toBeInTheDocument();
    expect(screen.getByText("Filter by Airlines")).toBeInTheDocument();
    expect(screen.getByText("Filter by Price")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Filter Flights" })
    ).toBeInTheDocument();
  });

  test("updates filter values on checkbox and radio button changes", async () => {
    render(
      <FlightFilters airlines={airlines} onFilterChange={onFilterChangeMock} />
    );

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByLabelText("air india"));
    await userEvent.click(screen.getByLabelText("jet spice"));

    expect(screen.getByLabelText("air india")).toBeChecked();
    expect(screen.getByLabelText("jet spice")).toBeChecked();

    await userEvent.click(screen.getByLabelText("Low to high"));

    expect(screen.getByLabelText("Low to high")).toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "Filter Flights" }));

    expect(onFilterChangeMock).toHaveBeenCalledWith(["A", "J"], "cheapest");
  });
});
