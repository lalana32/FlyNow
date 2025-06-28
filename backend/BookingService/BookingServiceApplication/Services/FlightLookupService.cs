using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Json;
using BookingServiceApplication.Interfaces;
using BookingServiceApplication.DTOs.External;


namespace BookingServiceApplication.Services
{
    public class FlightLookupService : IFlightLookupService
    {
        private readonly HttpClient _httpClient;

        public FlightLookupService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

    public async Task<FlightSearchResultDto?> GetFlightAsync(
        string origin, string destination, string departureDate, int adults, string? returnDate = null)
        {
            var url = $"flight-api/api/flight?origin={origin}&destination={destination}&departureDate={departureDate}&adults={adults}";

            if (!string.IsNullOrEmpty(returnDate))
            {
                url += $"&returnDate={returnDate}";
            }

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return null;

            var result = await response.Content.ReadFromJsonAsync<FlightSearchResultDto>();
            return result;
        }

    }

}