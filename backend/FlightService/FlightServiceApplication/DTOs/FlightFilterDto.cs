using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlightServiceApplication.DTOs
{
    public class FlightFilterDto
    {
        public decimal? MaxPrice { get; set; }
        public bool? DirectOnly { get; set; }
        public TimeSpan? MaxDuration { get; set; }
        public string? SortBy { get; set; }
        public bool Descending { get; set; }
    }
}