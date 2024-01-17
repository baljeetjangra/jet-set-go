"use client";
import React from "react";
import { Button } from "../../ui/button";
import { ArrowLeftRight } from "lucide-react";
import FlightInput from "./FlightInput";
import { Location } from "@/interfaces/flight";
import { FieldError, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/lib/schema";

const FlightSearch = ({ locations }: { locations: Location[] }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section className="p-4 bg-gray-100 rounded-xl flex flex-col gap-8">
      <FormProvider {...methods}>
        <h1 className="text-xl font-bold">Find your perfect flight</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-8">
            <div className="">
              <FlightInput
                placeholder="Enter source location"
                locations={locations}
                name="source"
              />
            </div>
            <ArrowLeftRight />
            <div className="">
              <FlightInput
                placeholder="Enter destination location"
                locations={locations}
                name="destination"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="rounded-full" type="submit">
              Search
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default FlightSearch;
