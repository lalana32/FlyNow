using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightServiceApplication.Interfaces;
using FlightServiceInfrastructure.Interfaces;

namespace FlightServiceApplication.Services
{
    public class FlightLocationAppService : IFlightLocationAppService
    {
        private  IFlightLocationService _flightLocationService;

        public FlightLocationAppService(IFlightLocationService flightLocationService)
        {
            _flightLocationService = flightLocationService;
        }

        public async Task<string> GetLocationsAsync(string keyword)
        {
            return await _flightLocationService.GetLocationsAsync(keyword);
        }
    }
}