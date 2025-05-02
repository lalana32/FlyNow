using AuthServiceApplication.Interfaces;
using AuthServiceApplication.Responses;
using AuthServiceInfrastructure.Identity;
using AuthServiceInfrastructure.Messaging;
using Microsoft.AspNetCore.Identity;


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
                Username = user.UserName!,
                Email = user.Email!,
                Token = token,
                Role = role!
            };

            return response;
        }


        public async Task<ServiceResponse<string>> RegisterAsync(string firstName, string lastName, string email, string username, string password)
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
                FirstName = firstName,
                LastName = lastName,
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
            
            var confirmationToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
           
            await _rabbitMqService.SendMessageAsync(
                queueName: "email_queue",
                email: user.Email,
                confirmationToken: confirmationToken
            );
           
            response.Data = "Registration successful. Please check your email to confirm your account.";
            return response;

        }

    }
}