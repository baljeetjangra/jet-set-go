"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Airline, Flight } from "@/interfaces";
import { map } from "lodash";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormProvider, useForm } from "react-hook-form";
import { FilterFlightFormData, filterFlightSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";

const FlightFilters = ({
  airlines,
  onFilterChange,
}: {
  airlines: Airline[];
  onFilterChange: (airlines: string[], priceType: string) => void;
}) => {
  const form = useForm<FilterFlightFormData>({
    resolver: zodResolver(filterFlightSchema),
  });
  const { watch, setValue } = form;

  const onSubmit = () => {
    onFilterChange(watch("airlines") || [], watch("priceType") || "");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Filters</Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Smart Searching with Filters</SheetTitle>
          <SheetDescription>
            Optimize your flight search using our intelligent filters.
          </SheetDescription>
        </SheetHeader>
        {/* filters */}
        <section className="my-4">
          <FormProvider {...form}>
            <h3 className="text-md font-bold">Filter by Airlines</h3>
            <div className="flex items-center flex-wrap gap-4 p-4">
              {map(airlines, (airline: Airline) => (
                <div key={airline.airlineCode}>
                  <Checkbox
                    id={airline.airlineCode}
                    checked={watch("airlines")?.includes(airline.airlineCode)}
                    onCheckedChange={() => {
                      const airlines = watch("airlines") || [];
                      if (airlines.includes(airline.airlineCode)) {
                        setValue(
                          "airlines",
                          airlines.filter(
                            (item) => item !== airline.airlineCode
                          )
                        );
                      } else {
                        setValue("airlines", [
                          ...airlines,
                          airline.airlineCode,
                        ]);
                      }
                    }}
                  />
                  <label htmlFor={airline.airlineCode} className="ml-2">
                    {airline.airlineName}
                  </label>
                </div>
              ))}
            </div>
            <div className="">
              <h3 className="text-md font-bold">Filter by Price</h3>
              <FormField
                control={form.control}
                name="priceType"
                render={({ field }) => (
                  <RadioGroup
                    className="p-4"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cheapest" id="cheapest" />
                      <Label htmlFor="cheapest">Low to high</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fastest" id="fastest" />
                      <Label htmlFor="fastest">High to low</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </FormProvider>
        </section>

        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={onSubmit} type="submit">
              Filter Flights
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FlightFilters;
