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


namespace BookingServiceApplication.Services
{
    public class BookingService : IBookingService
    {
        private readonly BookingDbContext _context;
        private readonly IMapper _mapper;

        public BookingService(BookingDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BookingDto> CreateBookingAsync(CreateBookingDto createBookingDto)
        {
            var booking = _mapper.Map<Booking>(createBookingDto);

            _context.Bookings.Add(booking);
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