export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  adults: number;
}

export type LocationOption = {
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  iataCode: string;
};

export interface AmadeusLocationResponse {
  id: string;
  iataCode: string;
  name: string;
  address: {
    cityName: string;
    countryName: string;
  };
}

export interface Flight {
  id: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  price: {
    currency: string;
    total: string;
  };
  airline: string;
  duration: string;
  stops: number;
}
