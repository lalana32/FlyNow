using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingServiceApplication.DTOs.External
{
    public class FlightDto
    {
        public string Id { get; set; }
        public string DepartureAirport { get; set; }
        public DateTime DepartureTime { get; set; }
        public string ArrivalAirport { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string CarrierCode { get; set; }
        public string FlightNumber { get; set; }
        public string Duration { get; set; }
        public int NumberOfStops { get; set; }
        public int NumberOfBookableSeats { get; set; }
        public string TotalPrice { get; set; }
        public string Currency { get; set; }
    }
}