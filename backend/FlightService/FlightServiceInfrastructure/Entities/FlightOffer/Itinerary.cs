using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceInfrastructure.Entities
{
    public class Itinerary
    {
        public string Duration { get; set; }
        public List<Segment> Segments { get; set; }

    }
}