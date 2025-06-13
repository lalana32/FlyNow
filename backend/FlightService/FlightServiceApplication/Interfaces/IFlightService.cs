using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightServiceApplication.Entities.FlightOffer;
using FlightServiceApplication.DTOs;

namespace FlightServiceApplication.Interfaces
{
    public interface IFlightService
    {
        Task<(List<FlightDto> DepartureFlights, List<FlightDto> ReturnFlights)> GetFlightsAsync(string origin, string destination, string departureDate, int adults, string? returnDate);
    }
}