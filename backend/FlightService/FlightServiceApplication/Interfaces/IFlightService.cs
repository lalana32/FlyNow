using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightServiceApplication.Entities.FlightOffer;

namespace FlightServiceApplication.Interfaces
{
    public interface IFlightService
    {
        Task<(List<FlightOfferModel> DepartureFlights, List<FlightOfferModel> ReturnFlights)> GetFlightsAsync(string origin, string destination, string departureDate, int adults, string? returnDate);
    }
}