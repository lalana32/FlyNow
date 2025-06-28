using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BookingServiceApplication.Interfaces;
using BookingServiceApplication.DTOs;


namespace BookingServiceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IFlightLookupService _flightLookupService;

        public BookingController(IBookingService bookingService, IFlightLookupService flightLookupService)
        {
            _bookingService = bookingService;
            _flightLookupService = flightLookupService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingDto createBookingDto)
        {
            var flightSearchResult = await _flightLookupService.GetFlightAsync(
                createBookingDto.DepartureAirport,
                createBookingDto.ArrivalAirport,
                createBookingDto.DepartureTime.ToString("yyyy-MM-dd"),
                createBookingDto.Adults,
                null
            );

            if (flightSearchResult == null)
            {
                return BadRequest("Letovi nisu dostupni sa zadatim parametrima.");
            }

            var created = await _bookingService.CreateBookingAsync(createBookingDto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(string userId)
        {
            var bookings = await _bookingService.GetBookingsByUserIdAsync(userId);
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);
            if (booking == null) return NotFound();
            return Ok(booking);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _bookingService.DeleteBookingAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}