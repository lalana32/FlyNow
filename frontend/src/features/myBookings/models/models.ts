export interface FlightSegmentDto {
  flightId: string;
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  carrierCode: string;
  flightNumber: string;
}

export interface BookingItemDto {
  passengerName: string;
  passengerLastName: string;
  passengerPassportNumber: string;
  seatNumber: string;
  baggageOptions: string;
}

export interface BookingDto {
  id: string;
  userId: string;
  bookingDate: string;
  totalPrice: number;
  currency: string;
  flightSegments: FlightSegmentDto[];
  bookingItems: BookingItemDto[];
}
