using AuthServiceApplication.Interfaces;
using AuthServiceApplication.Responses;
using AuthServiceInfrastructure.Identity;
using AuthServiceInfrastructure.Messaging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;


namespace AuthServiceApplication.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;  
        private readonly ITokenService _tokenService;
        private readonly IRabbitMqService _rabbitMqService;
     

        public AuthenticationService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, 
        ITokenService tokenService, IRabbitMqService rabbitMqService)
        {
            _userManager = userManager;
            _signInManager = signInManager;  
            _tokenService = tokenService;
            _rabbitMqService = rabbitMqService;
        }

        public async Task<ServiceResponse<string>> ConfirmEmailAsync(string userId, string token)
        {
            var response = new ServiceResponse<string>();

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";
                return response;
            }

    
            var decodedToken = System.Web.HttpUtility.UrlDecode(token);

            var result = await _userManager.ConfirmEmailAsync(user, decodedToken);
            if (result.Succeeded)
            {
                response.Data = "Email confirmed successfully!";
                response.Success = true;
            }
            else
            {
                response.Success = false;
                response.Message = "Invalid or expired confirmation token.";
            }

            return response;
        }

        public async Task<ServiceResponse<List<AuthResponse>>> GetAllUsersAsync()
        {
            var response = new ServiceResponse<List<AuthResponse>>();

    // Get all users
            var users = await  _userManager.Users.ToListAsync();

            // Map the users to UserResponse
            var userResponses = users.Select(user => new AuthResponse
            {
                Id = user.Id,
                Email = user.Email!,
                Username = user.UserName!
            }).ToList();

            response.Data = userResponses;
            response.Success = true;

            return response;
        }

        public async Task<ServiceResponse<string>> DeleteUserByIdAsync(string userId)
        {
            var response = new ServiceResponse<string>();

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                response.Success = false;
                response.Message = "Korisnik nije pronađen.";
                return response;
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                response.Success = false;
                response.Message = "Greška prilikom brisanja korisnika.";
                return response;
            }

            response.Success = true;
            response.Message = "Korisnik uspešno obrisan.";
            response.Data = userId;

            return response;
        }


        public async Task<ServiceResponse<AuthResponse>> LoginAsync(string username, string password)
        {
            var response = new ServiceResponse<AuthResponse>();
          
            var user = await _userManager.FindByNameAsync(username);
             if (user == null)
            {
                response.Success = false;
                response.Message = "Invalid username or password.";
                return response;
            }

            if (!await _userManager.IsEmailConfirmedAsync(user))
            {
                response.Success = false;
                response.Message = "Email not confirmed. Please check your inbox.";
                return response;
            }

           var signInResult = await _signInManager.PasswordSignInAsync(user, password, false, false);
            if (!signInResult.Succeeded)
            {
                response.Success = false;
                response.Message = "Invalid username or password.";
                return response;
            }

            var token = _tokenService.GenerateToken(user);
            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault();

            response.Data = new AuthResponse
            {
                Id = user.Id,
                Username = user.UserName!,
                Email = user.Email!,
                Token = token,
                Role = role!
            };

            return response;
        }


        public async Task<ServiceResponse<string>> RegisterAsync(string email, string username, string password)
        {
            var response = new ServiceResponse<string>();

            if (await _userManager.FindByNameAsync(username) != null)
            {
                response.Success = false;
                response.Message = "Username is already taken.";
                return response;
            }

            if (await _userManager.FindByEmailAsync(email) != null)
            {
                response.Success = false;
                response.Message = "Email is already registered.";
                return response;
            }

            var user = new ApplicationUser
            {
                
                Email = email,
                UserName = username
            };

            var result = await _userManager.CreateAsync(user, password);
            if (!result.Succeeded)
            {
                response.Success = false;
                response.Message = $"Registration failed: {string.Join(", ", result.Errors.Select(e => e.Description))}";
                return response;
            }
            await _userManager.AddToRoleAsync(user, "User");
            var userId = user.Id;
            
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var encodedToken = System.Web.HttpUtility.UrlEncode(confirmationToken);


           
            await _rabbitMqService.SendMessageAsync(
                queueName: "email_queue",
                email: user.Email,
                userId: userId,
                confirmationToken: encodedToken
            );
           
            response.Data = $"Registration successful. Please check your email to confirm your account. UserId: {user.Id}";
            return response;

        }

        

    }
}