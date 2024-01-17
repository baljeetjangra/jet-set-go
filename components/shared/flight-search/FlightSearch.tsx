"use client";
import React from "react";
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
import { schema } from "@/lib/schema";
import { useRouter } from "next/navigation";

const FlightSearch = ({ locations }: { locations: Location[] }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { handleSubmit } = methods;
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    router.push(`?source=${data.source}&destination=${data.destination}`);
  };

  return (
    <section className="p-6 bg-gray-100 rounded-xl flex flex-col gap-8">
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
