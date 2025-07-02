using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServiceDomain.Enums;

namespace BookingServiceDomain.Entities
{
    public class BookingItem
    {
        public Guid Id { get; set; }

        public Guid BookingId { get; set; }
        public Booking Booking { get; set; }
        public string PassengerName { get; set; }
        public string PassengerLastName { get; set; }
        public string PassengerPassportNumber { get; set; } 
        public string SeatNumber { get; set; }
        public BaggageOptions BaggageOptions { get; set; }

    }

}