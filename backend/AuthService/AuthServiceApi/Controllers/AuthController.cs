using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthServiceApplication.DTOs;
using AuthServiceApplication.Interfaces;

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
                string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.FirstName) || string.IsNullOrEmpty(registerDto.LastName))
            {
                return BadRequest("All fields are required.");
            }

            try
            {
                var token = await _authService.RegisterAsync(registerDto.FirstName, registerDto.LastName, registerDto.Email, registerDto.UserName, registerDto.Password);
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
    }
    
}