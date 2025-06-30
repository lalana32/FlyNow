using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingServiceDomain.Entities
{
  public class Booking
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }     
        public string FlightId { get; set; }   
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public string DepartureAirport { get; set; }
        public DateTime DepartureTime { get; set; }
        public string ArrivalAirport { get; set; }
        public DateTime ArrivalTime { get; set; }
        public string CarrierCode { get; set; }
        public string FlightNumber { get; set; }
        public string TotalPrice { get; set; }
        public string Currency { get; set; }

    }


}