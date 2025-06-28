using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServiceApplication.DTOs.External;
namespace BookingServiceApplication.Interfaces
{
    public interface IFlightLookupService
    {
        Task<FlightSearchResultDto?> GetFlightAsync(string origin, string destination, string departureDate, int adults, string? returnDate);
    }
}