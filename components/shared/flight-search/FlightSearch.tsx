"use client";
import React, { useEffect } from "react";
import { Button } from "../../ui/button";
import { ArrowLeftRight } from "lucide-react";
import FlightInput from "./FlightInput";
import { Location } from "@/interfaces/flight";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchFlightFormData, searchFlightSchema } from "@/lib/schema";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchParamsProps } from "@/interfaces";
import { isEmpty } from "lodash";

const FlightSearch = ({ locations }: { locations: Location[] }) => {
  const methods = useForm<SearchFlightFormData>({
    resolver: zodResolver(searchFlightSchema),
  });
  const { handleSubmit } = methods;
  const searchParams: any = useSearchParams();
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const router = useRouter();

  React.useEffect(() => {
    if (source && destination) {
      methods.setValue("source", source);
      methods.setValue("destination", destination);
    }
  }, [source, destination, methods]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    router.push(`/?source=${data.source}&destination=${data.destination}`);
  };

  return (
    <section className="p-6 bg-gray-100 rounded-xl flex flex-col gap-8">
      <FormProvider {...methods}>
        <h1 className="text-xl font-bold">Find your perfect flight</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center flex-wrap gap-8">
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
            <Button className="rounded-full" type="submit">
              Search
            </Button>
            <Button
              className="rounded-full"
              variant={"outline"}
              onClick={() => {
                methods.reset();
                router.push("/");
              }}
            >
              Clear
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};

export default FlightSearch;
