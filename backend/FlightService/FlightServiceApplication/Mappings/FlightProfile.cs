using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FlightServiceApplication.Entities.FlightOffer; // For application models
using FlightServiceInfrastructure.Entities;
using FlightServiceApplication.DTOs;

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

            CreateMap<FlightOffer, FlightDto>()
    .ForMember(dest => dest.DepartureAirport,
        opt => opt.MapFrom(src => src.Itineraries[0].Segments[0].Departure.IataCode))
    .ForMember(dest => dest.DepartureTime,
        opt => opt.MapFrom(src => src.Itineraries[0].Segments[0].Departure.At))
    .ForMember(dest => dest.ArrivalAirport,
        opt => opt.MapFrom(src => src.Itineraries[0].Segments.Last().Arrival.IataCode))
    .ForMember(dest => dest.ArrivalTime,
        opt => opt.MapFrom(src => src.Itineraries[0].Segments.Last().Arrival.At))
    .ForMember(dest => dest.CarrierCode,
        opt => opt.MapFrom(src => src.Itineraries[0].Segments[0].CarrierCode))
    .ForMember(dest => dest.FlightNumber,
        opt => opt.MapFrom(src => src.Itineraries[0].Segments[0].Number))
    .ForMember(dest => dest.Duration,
        opt => opt.MapFrom(src => src.Itineraries[0].Duration))
    .ForMember(dest => dest.NumberOfStops,
        opt => opt.MapFrom(src => src.Itineraries[0].Segments.Count - 1))
    .ForMember(dest => dest.NumberOfBookableSeats,
        opt => opt.MapFrom(src => src.NumberOfBookableSeats))
    .ForMember(dest => dest.TotalPrice,
        opt => opt.MapFrom(src => src.Price.Total))
    .ForMember(dest => dest.Currency,
        opt => opt.MapFrom(src => src.Price.Currency));

        }
    }
}