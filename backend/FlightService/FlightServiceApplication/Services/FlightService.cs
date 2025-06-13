using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightServiceApplication.Entities.FlightOffer;
using FlightServiceInfrastructure.Entities;
using FlightServiceInfrastructure.Interfaces;
using FlightServiceApplication.Interfaces;
using FlightServiceApplication.DTOs;
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
        
        public async Task<(List<FlightDto> DepartureFlights, List<FlightDto> ReturnFlights)> GetFlightsAsync(
            string origin, string destination, string departureDate, int adults, string? returnDate)
        {
            var (departureFlights, returnFlights) = await _flightApiClient.GetFlightOffersAsync(origin, destination, departureDate, adults, returnDate);

            var mappedDeparture = _mapper.Map<List<FlightDto>>(departureFlights);
            var mappedReturn = _mapper.Map<List<FlightDto>>(returnFlights);

            return (mappedDeparture, mappedReturn);
        }

    }
}