import { Flight } from "@/interfaces";
import React from "react";
import FlightCard from "./FlightCard";

const FlightList = ({ flights }: { flights: Flight[] }) => {
  return (
    <section className="flex flex-wrap gap-6 mt-8">
      {flights.map((flight: Flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </section>
  );
};

export default FlightList;
