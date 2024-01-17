"use client";
import { Airline, Flight } from "@/interfaces";
import React from "react";
import FlightCard from "./FlightCard";
import { size } from "lodash";
import Image from "next/image";
import FlightFilters from "../flight-filter/FlightFilters";
import {
  extractAirlines,
  filterAndSortFlights,
  filterFlightsByRoute,
} from "@/helper/flightHelper";
import { useSearchParams } from "next/navigation";

const FlightList = ({
  flights,
  title,
}: {
  flights: Flight[];
  title: string;
}) => {
  const [filteredFlights, setFilteredFlights] =
    React.useState<Flight[]>(flights);
  const searchParams: any = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const airlines: Airline[] = extractAirlines(flights);

  const handleFilterChange = (airlines: string[], priceType: string) => {
    if (airlines.length === 0 && priceType === "") {
      setFilteredFlights(flights);
    } else {
      const updatedFlights = filterAndSortFlights(flights, airlines, priceType);
      setFilteredFlights(updatedFlights);
    }
  };

  React.useEffect(() => {
    if (source && destination) {
      const filterFlights = filterFlightsByRoute(source, destination, flights);
      setFilteredFlights(filterFlights);
    } else {
      setFilteredFlights(flights);
    }
  }, [source, destination, flights]);

  return (
    <section className=" mt-8">
      {size(filteredFlights) > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <FlightFilters
              airlines={airlines}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredFlights.map((flight: Flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold pb-2">No flights found!</h3>
          <Image
            className="rounded-xl"
            src="/no-flight.jpg"
            width={500}
            height={500}
            alt="person waiting for the flight"
          />
        </div>
      )}
    </section>
  );
};

export default FlightList;
