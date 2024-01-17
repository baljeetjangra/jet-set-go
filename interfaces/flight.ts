export interface Flight {
  id: string;
  fare: number;
  displayData: {
    source: {
      airport: {
        cityCode: string;
        cityName: string;
        terminal: string;
        airportCode: string;
        airportName: string;
        countryCode: string;
        countryName: string;
      };
      depTime: string;
    };
    airlines: Airline[];
    stopInfo: string;
    destination: {
      airport: {
        cityCode: string;
        cityName: string;
        terminal: string;
        airportCode: string;
        airportName: string;
        countryCode: string;
        countryName: string;
      };
      arrTime: string;
    };
    totalDuration: string;
  };
}

export interface Location {
  label: string;
  value: string;
}

export interface Airline {
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
}
