import { Flight, Location } from "@/interfaces";
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
