using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace EmailServiceApplication.Interfaces
{
    public interface IEmailService
    {
        Task SendVerificationEmailAsync(string toEmail, string confirmationLink);
    }
}