import { Flight } from "@/interfaces";
import { Location } from "@/interfaces/flight";
import { type ClassValue, clsx } from "clsx";
import { lowerCase } from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
