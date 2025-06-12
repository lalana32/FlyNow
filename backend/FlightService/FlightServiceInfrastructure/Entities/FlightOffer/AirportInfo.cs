using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceInfrastructure.Entities
{
    public class AirportInfo
    {
        public string IataCode { get; set; }
        public DateTime At { get; set; }
    }
}