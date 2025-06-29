using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServiceApplication.Interfaces;
using BookingServiceApplication.DTOs;
using BookingServiceInfrastructure.Data;
using AutoMapper;
using BookingServiceDomain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Globalization;


namespace BookingServiceApplication.Services
{
    public class BookingService : IBookingService
    {
        private readonly BookingDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFlightLookupService _flightLookupService;

        public BookingService(BookingDbContext context, IMapper mapper, IFlightLookupService flightLookupService)
        {
            _context = context;
            _mapper = mapper;
            _flightLookupService = flightLookupService;
        }

        public async Task<BookingDto> CreateBookingAsync(CreateBookingDto createBookingDto)
        {
           string departureDateString = createBookingDto.DepartureTime.ToString("yyyy-MM-dd");

           var flight = await _flightLookupService.GetFlightAsync(createBookingDto.DepartureAirport, createBookingDto.ArrivalAirport,
                departureDateString, createBookingDto.Adults, null);
            if (flight == null)
                throw new Exception("Let nije pronađen.");

            var booking = new Booking
            {
                Id = Guid.NewGuid(),
            UserId = createBookingDto.UserId,
            FlightId = createBookingDto.FlightId,
            DepartureAirport = createBookingDto.DepartureAirport,
            ArrivalAirport = createBookingDto.ArrivalAirport,
            DepartureTime = DateTime.SpecifyKind(
            DateTime.ParseExact(createBookingDto.DepartureTime.ToString("yyyy-MM-ddTHH:mm:ss"), "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture),
            DateTimeKind.Utc // Eksplicitno postavite UTC
        ),
            ArrivalTime = DateTime.SpecifyKind(
            DateTime.ParseExact(createBookingDto.ArrivalTime.ToString("yyyy-MM-ddTHH:mm:ss"), "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture),
            DateTimeKind.Utc // Eksplicitno postavite UTC
            ),

            CarrierCode = createBookingDto.CarrierCode,
            FlightNumber = createBookingDto.FlightNumber,
            TotalPrice = createBookingDto.TotalPrice,
            Currency = createBookingDto.Currency,
            };

            await _context.AddAsync(booking);
            await _context.SaveChangesAsync();
            return _mapper.Map<BookingDto>(booking);
        }

        public async Task<IEnumerable<BookingDto>> GetBookingsByUserIdAsync(string userId)
        {
           var bookings = await _context.Bookings
            .Where(b => b.UserId == userId)
            .ToListAsync();

            return _mapper.Map<IEnumerable<BookingDto>>(bookings);
        }

        public async Task<BookingDto?> GetBookingByIdAsync(Guid id)
        {
           var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
                return null;

            return _mapper.Map<BookingDto>(booking);
        }

        public async Task<bool> DeleteBookingAsync(Guid id)
        {
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null) return false;

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }
    
    }
}