using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingServiceApplication.DTOs;
using BookingServiceDomain.Entities;

namespace BookingServiceApplication.Mappings
{
    public class BookingProfile : Profile
    {
       public BookingProfile()
        {
            CreateMap<CreateBookingDto, Booking>();

            CreateMap<FlightSegment, FlightSegmentDto>();
            CreateMap<BookingItem, BookingItemDto>();

            CreateMap<Booking, BookingDto>()
                .ForMember(dest => dest.FlightSegments, opt => opt.MapFrom(src => src.FlightSegments))
                .ForMember(dest => dest.BookingItems, opt => opt.MapFrom(src => src.BookingItems));
        }

    }
}