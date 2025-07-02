using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServiceDomain.Entities;

namespace BookingServiceApplication.DTOs
{
    public class CreateBookingDto
    {
        public string UserId { get; set; }
        public string TotalPrice { get; set; }
        public string Currency { get; set; }

        public List<CreateBookingItemDto> BookingItems { get; set; }
        public List<CreateFlightSegmentDto> FlightSegments { get; set; }
    }
}