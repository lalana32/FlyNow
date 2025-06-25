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
            CreateMap<Booking, BookingDto>();
        }
    }
}