using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightServiceApplication.Entities.FlightOffer;
using FlightServiceInfrastructure.Entities;
using FlightServiceInfrastructure.Interfaces;
using FlightServiceApplication.Interfaces;
using AutoMapper;



namespace FlightServiceApplication.Services
{
    public class FlightService : IFlightService
    {
        private readonly IFlightApiClient _flightApiClient;
        private readonly IMapper _mapper;

        public FlightService(IFlightApiClient flightApiClient, IMapper mapper)
        {
            _flightApiClient = flightApiClient;
            _mapper = mapper;
        }
        
        public async Task<(List<FlightOfferModel> DepartureFlights, List<FlightOfferModel> ReturnFlights)> GetFlightsAsync(
            string origin, string destination, string departureDate, int adults, string? returnDate)
        {
            var (departureFlights, returnFlights) = await _flightApiClient.GetFlightOffersAsync(origin, destination, departureDate, adults, returnDate);

            var mappedDeparture = _mapper.Map<List<FlightOfferModel>>(departureFlights);
            var mappedReturn = _mapper.Map<List<FlightOfferModel>>(returnFlights);

            return (mappedDeparture, mappedReturn);
        }

    }
}