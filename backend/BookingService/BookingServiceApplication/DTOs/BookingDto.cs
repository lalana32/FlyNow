using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BookingServiceApplication.DTOs
{
    public class BookingDto
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public DateTime BookingDate { get; set; }
    public decimal TotalPrice { get; set; }
    public string Currency { get; set; }

    public List<FlightSegmentDto> FlightSegments { get; set; }
    public List<BookingItemDto> BookingItems { get; set; }
}

}