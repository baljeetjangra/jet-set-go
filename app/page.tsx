import { Avatar } from "@/components/shared/Avatar";
import FlightSearch from "@/components/shared/flight-search/FlightSearch";
import Searchbar from "@/components/shared/Searchbar";
import FlightList from "@/components/shared/flight/FlightList";
import { Flight } from "@/interfaces";
import { get } from "lodash";
import { extractLocations } from "@/helper/flightHelper";
import { Separator } from "@/components/ui/separator";

const fetchFlights = async () => {
  const res = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function Home() {
  const data = await fetchFlights();
  const flights: Flight[] = get(data, "data.result", []);
  const locations = extractLocations(flights);

  return (
    <main className={`flex flex-col gap-6 md:ml-56 w-full`}>
      <div className="bg-gray-100 p-6 flex flex-wrap justify-between">
        <Searchbar />
        <Avatar />
      </div>
      <div className="p-6 flex flex-col gap-6">
        <FlightSearch locations={locations} />
        <Separator />
        <FlightList
          title={`Discover a Variety of Flights -`}
          flights={flights}
        />
      </div>
    </main>
  );
}
