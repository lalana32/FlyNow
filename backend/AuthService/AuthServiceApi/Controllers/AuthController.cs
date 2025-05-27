using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AuthServiceApplication.DTOs;
using AuthServiceApplication.Interfaces;
using AuthServiceApplication.Responses;
using Microsoft.AspNetCore.Mvc;



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

            try
            {
                var token = await _authService.LoginAsync(loginDto.UserName, loginDto.Password);
                return Ok(new { Token = token });
            }
            catch (UnauthorizedAccessException)
            {
                return Unauthorized("Invalid username or password.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (registerDto == null || string.IsNullOrEmpty(registerDto.UserName) || string.IsNullOrEmpty(registerDto.Password) ||
                string.IsNullOrEmpty(registerDto.Email))
            {
                return BadRequest("All fields are required.");
            }

            try
            {
                var token = await _authService.RegisterAsync(registerDto.Email, registerDto.UserName, registerDto.Password);
                return Ok(new { Token = token });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);  
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("confirm")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string token)
        {
            var decodedToken = WebUtility.UrlDecode(token); 
            var response = await _authService.ConfirmEmailAsync(userId, decodedToken);

            if (response.Success)
                return Ok(response.Data);
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