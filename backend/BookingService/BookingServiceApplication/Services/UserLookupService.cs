using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BookingServiceApplication.Interfaces;
using BookingServiceApplication.DTOs.External.AuthService;

namespace BookingServiceApplication.Services
{
    public class UserLookupService : IUserLookupService
    {
        private readonly HttpClient _httpClient;

        public UserLookupService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<AuthResponse?> GetUserByIdAsync(string userId)
        {
            var response = await _httpClient.GetAsync($"auth-api/api/auth/user/{userId}");

            if (!response.IsSuccessStatusCode)
            {
                return null;
            }

            var json = await response.Content.ReadAsStringAsync();
            var user = JsonConvert.DeserializeObject<ServiceResponse<AuthResponse>>(json);

            return user?.Data;
        }
    }
}