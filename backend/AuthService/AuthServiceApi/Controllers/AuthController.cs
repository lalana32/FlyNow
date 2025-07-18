using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AuthServiceApplication.DTOs;
using AuthServiceApplication.Interfaces;
using AuthServiceApplication.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;



namespace AuthServiceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthenticationService _authService;

        public AuthController(IAuthenticationService authService)
        {
            _authService = authService;
        }

        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.UserName) || string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest("Username and password are required.");
            }

                var response = await _authService.LoginAsync(loginDto.UserName, loginDto.Password);

            if (!response.Success)
            {
                return Unauthorized(response.Message);
            }

            return Ok(response);
        
         
        }

        
        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<string>>> Register([FromBody] RegisterDto registerDto)
        {
            if (registerDto == null || string.IsNullOrEmpty(registerDto.UserName) || string.IsNullOrEmpty(registerDto.Password) ||
                string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.FirstName)
                || string.IsNullOrEmpty(registerDto.LastName))
            {
                return BadRequest("All fields are required.");
            }
                var response = await _authService.RegisterAsync(registerDto.FirstName, registerDto.LastName, registerDto.Email, registerDto.UserName, registerDto.Password
                );
            if (!response.Success)
            {
                return BadRequest(response.Message); 
            }

            return Ok(response);
    
           
           
        }

        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token)
        {
              
            var response = await _authService.ConfirmEmailAsync(userId, token);

           if (response.Success)
            {
                return Redirect("http://localhost:5173/confirm-email");
            }
            else
                return BadRequest(response.Message);
        }


        [HttpGet("users")]
        public async Task<ActionResult<ServiceResponse<List<AuthResponse>>>> GetAllUsers()
        {
            var response = await _authService.GetAllUsersAsync();

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response);
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<ServiceResponse<AuthResponse>>> GetUserById(string id)
        {
            var response = await _authService.GetUserByIdAsync(id);
            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            return Ok(response);

        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _authService.DeleteUserByIdAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

    } 
}