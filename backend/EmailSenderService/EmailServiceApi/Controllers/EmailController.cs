using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EmailServiceApplication.DTOs;
using EmailServiceApplication.Interfaces;


namespace EmailServiceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send-verification-email")]
        public async Task<IActionResult> SendVerificationEmail(string email)
        {
            var confirmationLink = "jantar";

            try
            {
                await _emailService.SendVerificationEmailAsync(email);
                return Ok("Verification email sent.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error sending email: {ex.Message}");
            }
        }
    }
}