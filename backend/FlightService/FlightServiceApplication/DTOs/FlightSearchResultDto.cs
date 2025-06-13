using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceApplication.DTOs
{
    public class FlightSearchResultDto
    {
        public List<FlightDto> DepartureFlights { get; set; }
        public List<FlightDto> ReturnFlights { get; set; }
    }
}