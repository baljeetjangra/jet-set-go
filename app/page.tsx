import Searchbar from "@/components/shared/Searchbar";
import FlightList from "@/components/shared/flight/FlightList";
import { UI } from "@/enums";
import { Flight } from "@/interfaces";
import clsx from "clsx";
import { get } from "lodash";

const fetchFlights = async () => {
  const res = await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default async function Home() {
  const data = await fetchFlights();
  const flights: Flight[] = get(data, "data.result", []);

  const sidebarWidth = UI.SIDEBAR_WIDTH;

  return (
    <main
      className={clsx(`p-12 flex flex-col gap-6 `, {
        [`ml-${sidebarWidth}`]: sidebarWidth,
      })}
    >
      <h1 className="text-2xl font-bold">Find your perfect flight</h1>
      <Searchbar />
      <hr />
      <FlightList flights={flights} />
    </main>
  );
}
