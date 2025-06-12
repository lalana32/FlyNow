using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FlightServiceApplication.Entities.FlightOffer; // For application models
using FlightServiceInfrastructure.Entities;

namespace FlightServiceApplication.Mappings
{
    public class FlightProfile : Profile
    {
         public FlightProfile()
        {
            CreateMap<FlightOffer, FlightOfferModel>();
            CreateMap<Itinerary, ItineraryModel>();
            CreateMap<Segment, SegmentModel>();
            CreateMap<AirportInfo, AirportInfoModel>();
            CreateMap<Price, PriceModel>();
        }
    }
}