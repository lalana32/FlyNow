using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceInfrastructure.Entities
{
    public class Segment
    {
        public AirportInfo Departure { get; set; }
        public AirportInfo Arrival { get; set; }
        public string CarrierCode { get; set; }
        public string Number { get; set; }
        public string Duration { get; set; }
        public int NumberOfStops { get; set; }
    }
}