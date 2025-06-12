using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceInfrastructure.Interfaces
{
    public interface IFlightLocationService
    {
        Task<string> GetLocationsAsync(string keyword);
    }
}