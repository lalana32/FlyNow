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
        Task<ServiceResponse<string>> ConfirmEmailAsync(string userId, string token);
        Task<ServiceResponse<AuthResponse>> GetUserByIdAsync(string userId);
        Task<ServiceResponse<List<AuthResponse>>> GetAllUsersAsync();
        Task<ServiceResponse<string>> EditUserAsync(string id, string firstName, string lastName, string email, string username);
        Task<ServiceResponse<string>> DeleteUserByIdAsync(string userId);

    }
}