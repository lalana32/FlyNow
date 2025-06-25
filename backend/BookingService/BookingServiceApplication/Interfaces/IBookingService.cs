using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServiceApplication.DTOs;

namespace BookingServiceApplication.Interfaces
{
    public interface IBookingService
    {
        Task<BookingDto> CreateBookingAsync(CreateBookingDto createBookingDto);
        Task<IEnumerable<BookingDto>> GetBookingsByUserIdAsync(string userId);
        Task<BookingDto?> GetBookingByIdAsync(Guid id);
        Task<bool> DeleteBookingAsync(Guid id);
    }
}