import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaStopwatch,
} from "react-icons/fa";
import { Flight } from "@/interfaces";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";

const FlightCard = ({ flight }: { flight: Flight }) => {
  const { displayData } = flight;
  const { airlines, source, destination, totalDuration, stopInfo } =
    displayData;
  return (
    <Card className="bg-gray-100 rounded-2xl shadow-none max-w-[300px]">
      <CardHeader className="p-4 rounded-t-lg">
        <div className="flex justify-end">
          <BsThreeDots className="cursor-pointer" />
        </div>
        <Image
          className="rounded-xl"
          src="/plane.jpg"
          width={275}
          height={100}
          alt={airlines[0].airlineName}
        />
        <CardTitle className="text-lg pt-2 font-semibold">
          {airlines[0].airlineName}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <CardDescription className="flex items-center space-x-2">
              <FaPlaneDeparture className="text-blue-500" />
              <span>
                {source.airport.cityName} ({source.airport.airportCode})
              </span>
            </CardDescription>
            <CardDescription className="flex items-center space-x-2">
              <FaPlaneArrival className="text-green-500" />
              <span>
                {destination.airport.cityName} (
                {destination.airport.airportCode})
              </span>
            </CardDescription>
          </div>
          <div>
            <CardDescription className="flex items-center space-x-2">
              <FaClock className="text-gray-500" />
              <span>{new Date(source.depTime).toLocaleTimeString()}</span>
            </CardDescription>
            <CardDescription className="flex items-center space-x-2">
              <FaClock className="text-gray-500" />
              <span>{new Date(destination.arrTime).toLocaleTimeString()}</span>
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <CardDescription className="flex items-center space-x-2">
            <FaStopwatch className="text-primary" />
            <span>
              Duration: {totalDuration} ({stopInfo})
            </span>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 rounded-b-lg flex items-center justify-end">
        <div className="">
          <CardDescription className="p-2 px-4 rounded-full font-bold text-black bg-white">
            ₹{flight.fare}
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FlightCard;
