import { Flight, Location, Airline } from "@/interfaces";
import { lowerCase } from "lodash";

export function extractLocations(data: Flight[]) {
  const locations: Location[] = [];

  data.forEach((flight) => {
    const sourceCityLabel = `${flight.displayData.source.airport.cityName} (${flight.displayData.source.airport.cityCode})`;
    const sourceCityValue = lowerCase(
      flight.displayData.source.airport.cityCode
    );

    const destinationCityLabel = `${flight.displayData.destination.airport.cityName} (${flight.displayData.destination.airport.cityCode})`;
    const destinationCityValue = lowerCase(
      flight.displayData.destination.airport.cityCode
    );

    // Add source and destination locations to the array
    locations.push({ label: sourceCityLabel, value: sourceCityValue });
    locations.push({
      label: destinationCityLabel,
      value: destinationCityValue,
    });
  });

  // Filter out duplicates based on city code
  const uniqueLocations = locations.filter(
    (location, index, self) =>
      index === self.findIndex((l) => l.value === location.value)
  );

  return uniqueLocations;
}

export function filterFlightsByRoute(
  sourceCityCode: string,
  destinationCityCode: string,
  flightsData: Flight[]
) {
  const filteredFlights = flightsData.filter((flight) => {
    const sourceCodeMatch =
      lowerCase(flight.displayData.source.airport.cityCode) === sourceCityCode;
    const destinationCodeMatch =
      lowerCase(flight.displayData.destination.airport.cityCode) ===
      destinationCityCode;

    return sourceCodeMatch && destinationCodeMatch;
  });

  return filteredFlights;
}

export function extractAirlines(flightData: Flight[]) {
  const uniqueAirlines: { [key: string]: any } = {};

  flightData.forEach((flight) => {
    const airline = flight.displayData.airlines[0];
    const key = `${airline.airlineCode}-${airline.flightNumber}`;

    if (!uniqueAirlines[key]) {
      uniqueAirlines[key] = {
        airlineCode: airline.airlineCode,
        airlineName: airline.airlineName,
        flightNumber: airline.flightNumber,
      };
    }
  });

  return Object.values(uniqueAirlines);
}

export function filterAndSortFlights(
  flights: Flight[],
  selectedAirlines: string[],
  sortByPrice: string
) {
  let filteredFlights = JSON.parse(JSON.stringify(flights));

  // Filter by selected airlines
  if (selectedAirlines.length > 0) {
    filteredFlights = filteredFlights.filter((flight: Flight) =>
      flight.displayData.airlines.some((airline: Airline) =>
        selectedAirlines.some(
          (selectedAirline) => selectedAirline === airline.airlineCode
        )
      )
    );
  }

  // Sort by price
  if (sortByPrice === "cheapest") {
    filteredFlights.sort((a: Flight, b: Flight) => a.fare - b.fare);
  } else if (sortByPrice === "fastest") {
    filteredFlights.sort((a: Flight, b: Flight) => b.fare - a.fare);
  }

  return filteredFlights;
}
