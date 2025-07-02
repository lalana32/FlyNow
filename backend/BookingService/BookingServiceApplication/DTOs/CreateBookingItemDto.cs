using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServiceDomain.Enums;

namespace BookingServiceApplication.DTOs
{
    public class CreateBookingItemDto
    {
        public string PassengerName { get; set; }
        public string PassengerLastName { get; set; }
        public string PassengerPassportNumber { get; set; }
        public string SeatNumber { get; set; }
        public BaggageOptions BaggageOptions { get; set; }
    }
}