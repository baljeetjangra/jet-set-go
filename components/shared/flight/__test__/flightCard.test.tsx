/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import FlightCard from "../FlightCard";
import "@testing-library/jest-dom";
// Sample flight data for testing
const mockFlight = {
  id: "1",
  fare: 3840,
  displayData: {
    source: {
      airport: {
        cityCode: "DEL",
        cityName: "Delhi",
        terminal: "3",
        airportCode: "DEL",
        airportName: "Indira Gandhi Airport",
        countryCode: "IN",
        countryName: "India",
      },
      depTime: "2023-03-31T06:20",
    },
    airlines: [
      {
        airlineCode: "AB",
        airlineName: "JetSpice",
        flightNumber: "1234",
      },
    ],
    stopInfo: "Non stop",
    destination: {
      airport: {
        cityCode: "BOM",
        cityName: "Mumbai",
        terminal: "2",
        airportCode: "BOM",
        airportName: "Mumbai",
        countryCode: "IN",
        countryName: "India",
      },
      arrTime: "2023-03-31T08:40",
    },
    totalDuration: "2h 20m",
  },
};
it("renders FlightCard with correct content", () => {
  const { getByText, getByAltText } = render(
    <FlightCard flight={mockFlight} />
  );

  // Assert on the presence of certain elements and content

  expect(getByAltText("JetSpice")).toBeInTheDocument();
  expect(getByText("JetSpice")).toBeInTheDocument();
  expect(getByText("Delhi (DEL)")).toBeInTheDocument();
  expect(getByText("Mumbai (BOM)")).toBeInTheDocument();
  expect(getByText("Duration: 2h 20m (Non stop)")).toBeInTheDocument();
  expect(getByText(/₹3840/)).toBeInTheDocument();
});

// You can add more test cases to cover other aspects of the FlightCard component
