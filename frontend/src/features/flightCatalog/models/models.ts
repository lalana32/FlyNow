// types/interfaces.ts
export interface Flight {
  id: string;
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  carrierCode: string;
  flightNumber: string;
  duration: string;
  numberOfStops: number;
  numberOfBookableSeats: number;
  totalPrice: string;
  currency: string;
}

export interface FlightSearchResponse {
  departureFlights: Flight[];
  returnFlights: Flight[];
}
