using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightServiceInfrastructure.Entities;


namespace FlightServiceInfrastructure.Interfaces
{
    public interface IFlightApiClient
    {
        Task<(List<FlightOffer> DepartureFlights, List<FlightOffer> ReturnFlights)> GetFlightOffersAsync(string origin, string destination, string departureDate, int adults, string? returnDate);
    }
}