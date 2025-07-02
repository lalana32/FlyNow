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
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;

        public string TotalPrice { get; set; }
        public string Currency { get; set; }

        public ICollection<BookingItem> BookingItems { get; set; } = new List<BookingItem>();
        public ICollection<FlightSegment> FlightSegments { get; set; } = new List<FlightSegment>();
    }


}