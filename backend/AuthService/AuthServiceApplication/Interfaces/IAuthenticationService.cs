using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthServiceApplication.Responses;

namespace AuthServiceApplication.Interfaces
{
    public interface IAuthenticationService
    {
        Task<ServiceResponse<AuthResponse>> LoginAsync(string username, string password);
        Task<ServiceResponse<string>> RegisterAsync(string firstName, string lastName, string email, string username, string password);
    }
}