using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceApplication.Entities.FlightOffer
{
    public class ItineraryModel
    {
        public string Duration { get; set; }
        public List<SegmentModel> Segments { get; set; }
    }
}