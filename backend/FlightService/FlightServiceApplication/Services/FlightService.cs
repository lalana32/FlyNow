using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
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
    string origin, string destination, string departureDate, int adults, string? returnDate, FlightFilterDto filter)
    {
        var (departureFlights, returnFlights) = await _flightApiClient.GetFlightOffersAsync(origin, destination, departureDate, adults, returnDate);

        var filteredDeparture = ApplyFilters(departureFlights, filter);
        var filteredReturn = ApplyFilters(returnFlights, filter);

        var mappedDeparture = _mapper.Map<List<FlightDto>>(filteredDeparture);
        var mappedReturn = _mapper.Map<List<FlightDto>>(filteredReturn);

        return (mappedDeparture, mappedReturn);
    }



        private List<FlightOffer> ApplyFilters(List<FlightOffer> flights, FlightFilterDto filter)
        {
            var query = flights.AsQueryable();

            if (filter.MaxPrice.HasValue)
            {
                query = query.AsEnumerable()
                    .Where(f => decimal.TryParse(f.Price?.Total, out var price) && price <= filter.MaxPrice.Value)
                    .AsQueryable();
            }


            if (filter.DirectOnly == true)
            {
                query = query.Where(f => f.Itineraries.All(i => i.Segments.Count == 1));
            }

          if (filter.MaxDuration.HasValue)
            {
                query = query
                    .AsEnumerable()
                    .Where(f => f.Itineraries.All(i =>
                    {
                        var parsed = XmlConvert.ToTimeSpan(i.Duration);
                        return parsed <= filter.MaxDuration.Value;
                    }))
                    .AsQueryable();
            }

            // Sortiranje
            query = filter.SortBy switch
            {
               "price" => filter.Descending
                ? query.OrderByDescending(f => ParsePrice(f))
                : query.OrderBy(f => ParsePrice(f)),

                "duration" => filter.Descending
                    ? query.OrderByDescending(f => ParseDuration(f))
                    : query.OrderBy(f => ParseDuration(f)),
                _ => query
            };

            return query.ToList();
        }

        private TimeSpan ParseDuration(FlightOffer flight)
        {
            return flight.Itineraries
                .Select(i => XmlConvert.ToTimeSpan(i.Duration))
                .Aggregate(TimeSpan.Zero, (total, next) => total + next);
        }

        private decimal ParsePrice(FlightOffer f)
        {
            if (decimal.TryParse(f.Price?.Total, out var p))
                return p;

            return decimal.MaxValue; 
        }



    }
}