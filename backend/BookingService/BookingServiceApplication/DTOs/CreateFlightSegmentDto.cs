using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingServiceApplication.DTOs
{
    public class CreateFlightSegmentDto
    {
        public string FlightId { get; set; }
        public string DepartureAirport { get; set; }
        public DateTime DepartureTime { get; set; }
        public string ArrivalAirport { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string CarrierCode { get; set; }
        public string FlightNumber { get; set; }
    }
}