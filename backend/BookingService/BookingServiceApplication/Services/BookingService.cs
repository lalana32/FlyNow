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
using BookingServiceInfrastructure.Messaging;


namespace BookingServiceApplication.Services
{
    public class BookingService : IBookingService
    {
        private readonly BookingDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFlightLookupService _flightLookupService;
        private readonly IRabbitMqService _rabbitMqService;
        private readonly HttpClient _httpClient;
        private readonly IUserLookupService _userLookupService;

        public BookingService(BookingDbContext context, IMapper mapper, IFlightLookupService flightLookupService,
        IRabbitMqService rabbitMqService, HttpClient httpClient, IUserLookupService userLookupService)
        {
            _context = context;
            _mapper = mapper;
            _flightLookupService = flightLookupService;
            _rabbitMqService = rabbitMqService;
            _httpClient = httpClient;
            _userLookupService = userLookupService;
        }

       public async Task<BookingDto> CreateBookingAsync(CreateBookingDto createBookingDto)
{
    var booking = new Booking
    {
        Id = Guid.NewGuid(),
        UserId = createBookingDto.UserId,
        BookingDate = DateTime.UtcNow,
        TotalPrice = createBookingDto.TotalPrice,
        Currency = createBookingDto.Currency,
    };

    foreach (var segmentDto in createBookingDto.FlightSegments)
    {
        var flightSegment = new FlightSegment
        {
            Id = Guid.NewGuid(),
            BookingId = booking.Id,
            FlightId = segmentDto.FlightId,
            DepartureAirport = segmentDto.DepartureAirport,
            DepartureTime = DateTime.SpecifyKind(segmentDto.DepartureTime, DateTimeKind.Utc),
            ArrivalAirport = segmentDto.ArrivalAirport,
            ArrivalTime = DateTime.SpecifyKind(segmentDto.ArrivalTime, DateTimeKind.Utc),
            CarrierCode = segmentDto.CarrierCode,
            FlightNumber = segmentDto.FlightNumber,
            Booking = booking
        };

        booking.FlightSegments.Add(flightSegment);

        var usedSeats = _context.BookingItems
            .Where(bi => bi.Booking.FlightSegments.Any(fs => fs.FlightId == segmentDto.FlightId))
            .Select(bi => bi.SeatNumber)
            .ToHashSet();

        int seatCounter = 1;
        foreach (var itemDto in createBookingDto.BookingItems)
        {
            while (usedSeats.Contains(seatCounter.ToString()))
                seatCounter++;

            var bookingItem = new BookingItem
            {
                Id = Guid.NewGuid(),
                BookingId = booking.Id,
                PassengerName = itemDto.PassengerName,
                PassengerLastName = itemDto.PassengerLastName,
                PassengerPassportNumber = itemDto.PassengerPassportNumber,
                SeatNumber = seatCounter.ToString(),
                BaggageOptions = itemDto.BaggageOptions,
                Booking = booking
            };

            booking.BookingItems.Add(bookingItem);
            usedSeats.Add(seatCounter.ToString());
        }

    }

    await _context.Bookings.AddAsync(booking);
    await _context.SaveChangesAsync();

    var bookingDto = _mapper.Map<BookingDto>(booking);

    var user = await _userLookupService.GetUserByIdAsync(createBookingDto.UserId);
    if (user != null)
    {
        Console.WriteLine(user.Email);

        await _rabbitMqService.SendMessageAsync(
            queueName: "ticket_email_queue",
            email: user.Email,
            passengerFirstName: user.FirstName,
            passengerLastName: user.LastName
        );
    }
    else
    {
        Console.WriteLine($"User with id {createBookingDto.UserId} not found, email not sent.");
    }

    return bookingDto;
}


        public async Task<IEnumerable<BookingDto>> GetBookingsByUserIdAsync(string userId)
        {
           var bookings = await _context.Bookings
            .Include(b => b.FlightSegments)
            .Include(b => b.BookingItems)
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