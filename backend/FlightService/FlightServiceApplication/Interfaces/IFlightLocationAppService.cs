using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceApplication.Interfaces
{
    public interface IFlightLocationAppService
    {
        Task<string> GetLocationsAsync(string keyword);
    }
}