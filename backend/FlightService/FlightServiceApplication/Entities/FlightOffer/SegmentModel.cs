using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceApplication.Entities.FlightOffer
{
    public class SegmentModel
    {
        public AirportInfoModel Departure { get; set; }
        public AirportInfoModel Arrival { get; set; }
        public string CarrierCode { get; set; }
        public string Number { get; set; }
        public string Duration { get; set; }
        public int NumberOfStops { get; set; }
    }
}