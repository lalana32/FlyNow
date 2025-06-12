using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceInfrastructure.Entities.FlightApiResponse
{
    public class FlightApiResponse
    {
        public Meta Meta { get; set; }
        public List<FlightOffer> Data { get; set; }
    }
}