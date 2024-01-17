import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { ArrowLeftRight } from "lucide-react";
import FlightInput from "./FlightInput";
import { Location } from "@/interfaces/flight";

const FlightSearch = ({ locations }: { locations: Location[] }) => {
  return (
    <section className="p-4 bg-gray-100 rounded-xl flex flex-col gap-8">
      <h1 className="text-xl font-bold">Find your perfect flight</h1>
      <div className="flex items-center gap-8">
        <FlightInput
          placeholder="Enter source location"
          locations={locations}
        />
        <ArrowLeftRight />
        <FlightInput
          placeholder="Enter destination location"
          locations={locations}
        />
      </div>
      <div className="flex justify-end">
        <Button className="rounded-full">Search</Button>
      </div>
    </section>
  );
};

export default FlightSearch;
