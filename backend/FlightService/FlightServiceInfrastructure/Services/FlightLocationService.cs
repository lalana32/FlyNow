using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlightServiceInfrastructure.Interfaces;  

namespace FlightServiceInfrastructure.Services
{
    public class FlightLocationService : IFlightLocationService
    {
    private readonly HttpClient _httpClient;
    private readonly ITokenService _tokenService;

    public FlightLocationService(HttpClient httpClient, ITokenService tokenService)
    {
        _httpClient = httpClient;
        _tokenService = tokenService;
    }

    public async Task<string> GetLocationsAsync(string keyword)
    {
        var token = await _tokenService.GetAccessTokenAsync();

        var request = new HttpRequestMessage(
    HttpMethod.Get,
    $"https://test.api.amadeus.com/v1/reference-data/locations?keyword={keyword}&subType=AIRPORT,CITY"
);

        request.Headers.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();

        return content;
    }
    }
}