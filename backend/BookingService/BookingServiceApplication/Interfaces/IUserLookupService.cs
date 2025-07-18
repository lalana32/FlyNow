using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServiceApplication.DTOs.External.AuthService;

namespace BookingServiceApplication.Interfaces
{
    public interface IUserLookupService
    {
        Task<AuthResponse?> GetUserByIdAsync(string userId);
    }
}