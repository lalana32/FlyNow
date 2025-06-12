using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceApplication.Entities.FlightOffer
{
    public class FlightSearchResponse
    {
        public List<FlightOfferModel> DepartureFlights { get; set; }
        public List<FlightOfferModel> ReturnFlights { get; set; }  
    }
}