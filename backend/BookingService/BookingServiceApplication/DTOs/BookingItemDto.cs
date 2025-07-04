using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingServiceApplication.DTOs
{
    public class BookingItemDto
    {
        public string PassengerName { get; set; }
        public string PassengerLastName { get; set; }
        public string PassengerPassportNumber { get; set; }
        public string SeatNumber { get; set; }
        public string BaggageOptions { get; set; }
    }
}