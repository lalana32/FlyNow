using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FlightServiceApplication.Interfaces;
using FlightServiceApplication.Entities.FlightOffer;


namespace FlightServiceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlightController : ControllerBase
    {
        private readonly IFlightService _flightService;
        private readonly IFlightLocationAppService _flightLocationAppService;

        public FlightController(IFlightService flightService, IFlightLocationAppService flightLocationAppService)
        {
            _flightService = flightService;
            _flightLocationAppService = flightLocationAppService;
        }


        [HttpGet]
        public async Task<IActionResult> GetFlights(string origin, string destination, string departureDate, int adults, string? returnDate)
        {
            var (departureFlights, returnFlights) = await _flightService.GetFlightsAsync(origin, destination, departureDate, adults, returnDate);

            var response = new FlightSearchResponse
            {
                DepartureFlights = departureFlights,
                ReturnFlights = returnFlights
            };

            return Ok(response);
        }
        

        [HttpGet("locations")]
        public async Task<IActionResult> GetLocations([FromQuery] string keyword)
        {
            var result = await _flightLocationAppService.GetLocationsAsync(keyword);
            return Content(result, "application/json");
        }
    }
}