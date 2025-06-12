using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using FlightServiceInfrastructure.Interfaces;
using Microsoft.Extensions.Configuration;

namespace FlightServiceApplication.Services
{
    public class TokenService : ITokenService
    {
         private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        private string _accessToken;
        private DateTime _tokenExpiration;

        public TokenService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> GetAccessTokenAsync()
        {
            if (!string.IsNullOrEmpty(_accessToken) && _tokenExpiration > DateTime.UtcNow.AddMinutes(1))
            {
                return _accessToken; // token još važi
            }

            var clientId = _configuration["Amadeus:ClientId"];
            var clientSecret = _configuration["Amadeus:ClientSecret"];

            var content = new StringContent($"grant_type=client_credentials&client_id={clientId}&client_secret={clientSecret}",
                Encoding.UTF8, "application/x-www-form-urlencoded");

            var response = await _httpClient.PostAsync("https://test.api.amadeus.com/v1/security/oauth2/token", content);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            _accessToken = root.GetProperty("access_token").GetString();
            var expiresIn = root.GetProperty("expires_in").GetInt32();

            _tokenExpiration = DateTime.UtcNow.AddSeconds(expiresIn);

            return _accessToken;
        }
    }
}