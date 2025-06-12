using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceApplication.Entities.FlightOffer
{
    public class FlightOfferModel
    {
        public string Id { get; set; }
        public int NumberOfBookableSeats { get; set; }
        public List<ItineraryModel> Itineraries { get; set; }
        public PriceModel Price { get; set; }
    }
}