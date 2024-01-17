import { Flight } from "@/interfaces";
import React from "react";
import FlightCard from "./FlightCard";
import { size } from "lodash";
import Image from "next/image";

const FlightList = ({ flights }: { flights: Flight[] }) => {
  return (
    <section className="flex flex-wrap gap-6 mt-8">
      {size(flights) > 0 ? (
        flights.map((flight: Flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-xl font-bold pb-2">No flights found!</h1>
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
