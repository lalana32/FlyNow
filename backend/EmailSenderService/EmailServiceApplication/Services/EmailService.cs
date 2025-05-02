using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmailServiceApplication.Interfaces;
using MimeKit;
using MailKit.Net.Smtp;

namespace EmailServiceApplication.Services
{
    public class EmailService : IEmailService
    {
        private readonly string _smtpServer = "smtp-mail.outlook.com"; 
        private readonly int _smtpPort = 587; 
        private readonly string _smtpUsername = "stefan.lalovic.2145@student.etf.ues.rs.ba"; // Koristite vašu adresu za autentifikaciju
        private readonly string _smtpPassword = "Tukididorovic1,";

        public async Task SendVerificationEmailAsync(string toEmail)
        {
            var message = new MimeMessage();
            
            // Zamenite adresu sa odgovarajućom (npr. korisnička adresa ili neka druga ovlašćena)
            message.From.Add(new MailboxAddress("YourApp", "stefan.lalovic.2145@student.etf.ues.rs.ba")); 
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Confirm Your Email Address";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $"<h1>Confirm Your Email Address</h1><p>Click <a href='XDhahahahahhahhahahaXD'>here</a> to confirm your email address.</p>"
            };

            message.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(_smtpServer, _smtpPort, false);
                await client.AuthenticateAsync(_smtpUsername, _smtpPassword);
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }
    }
}
