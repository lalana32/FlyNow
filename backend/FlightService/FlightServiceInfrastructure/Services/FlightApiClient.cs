using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using FlightServiceInfrastructure.Interfaces;
using FlightServiceInfrastructure.Entities;
using FlightServiceInfrastructure.Entities.FlightApiResponse;
using Newtonsoft.Json;



namespace FlightServiceInfrastructure.Services
{
    public class FlightApiClient : IFlightApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly ITokenService _tokenService;

        public FlightApiClient(HttpClient httpClient, ITokenService tokenService)
        {
            _httpClient = httpClient;
            _tokenService = tokenService;
        }

        public async Task<(List<FlightOffer> DepartureFlights, List<FlightOffer> ReturnFlights)> GetFlightOffersAsync(
    string origin, string destination, string departureDate, int adults, string? returnDate)
{
    var token = await _tokenService.GetAccessTokenAsync();

    var departureUrl =$"https://test.api.amadeus.com/v2/shopping/flight-offers?" +
        $"originLocationCode={origin}&destinationLocationCode={destination}" +
        $"&departureDate={departureDate}&adults={adults}&max=3";

    var departureRequest = new HttpRequestMessage(HttpMethod.Get, departureUrl);
    departureRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

    var departureResponse = await _httpClient.SendAsync(departureRequest);
    var departureContent = await departureResponse.Content.ReadAsStringAsync();

    Console.WriteLine("Departure JSON: " + departureContent);


    var departureResponseObj = JsonConvert.DeserializeObject<FlightApiResponse>(departureContent);
    var departureFlights = departureResponseObj?.Data ?? new List<FlightOffer>();

    var returnFlights = new List<FlightOffer>();

    if (!string.IsNullOrWhiteSpace(returnDate))
    {
        var returnUrl =
            $"https://test.api.amadeus.com/v2/shopping/flight-offers?" +
            $"originLocationCode={destination}&destinationLocationCode={origin}" +
            $"&departureDate={returnDate}&adults={adults}&max=3";

        var returnRequest = new HttpRequestMessage(HttpMethod.Get, returnUrl);
        returnRequest.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

        var returnResponse = await _httpClient.SendAsync(returnRequest);
        var returnContent = await returnResponse.Content.ReadAsStringAsync();

        var returnResponseObj = JsonConvert.DeserializeObject<FlightApiResponse>(returnContent);
        returnFlights = returnResponseObj?.Data ?? new List<FlightOffer>();
    }

    Console.WriteLine("Letoviii:");
foreach (var flight in departureFlights)
{
    Console.WriteLine($"Flight: {flight.Id}, Price: {flight.Price?.Total}");  // prilagodi polja po strukturi FlightOffer
}

Console.WriteLine("jos letova:");
foreach (var flight in returnFlights)
{
    Console.WriteLine($"Flight: {flight.Id}, Price: {flight.Price?.Total}");
}

    return (departureFlights, returnFlights);
}

    }
}