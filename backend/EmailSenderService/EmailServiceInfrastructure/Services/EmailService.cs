using EmailServiceApplication.Interfaces;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;
using MimeKit.Utils;
using EmailServiceApplication.Interfaces;

namespace EmailServiceInfrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly IPdfGenerator _pdfGenerator;

        public EmailService(IConfiguration config, IPdfGenerator pdfGenerator)
        {
            _config = config;
            _pdfGenerator = pdfGenerator;
        }

        public async Task SendVerificationEmailAsync(string toEmail, string confirmationLink)
        {
            var smtpServer = _config["EmailSettings:SmtpServer"];
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var smtpUsername = _config["EmailSettings:SmtpUsername"];
            var smtpPassword = _config["EmailSettings:SmtpPassword"];
            var fromEmail = _config["EmailSettings:FromEmail"];
            var fromName = _config["EmailSettings:FromName"];

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromName, fromEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Confirm Your Email Address";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $"<h1>Confirm Your Email Address</h1><p>Click <a href='{confirmationLink}'>here</a> to confirm your email address.</p>"
            };

            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(smtpUsername, smtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        public async Task SendTicketEmailAsync(string toEmail, string passengerName, string flightNumber, string bookingCode)
        {
            var smtpServer = _config["EmailSettings:SmtpServer"];
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var smtpUsername = _config["EmailSettings:SmtpUsername"];
            var smtpPassword = _config["EmailSettings:SmtpPassword"];
            var fromEmail = _config["EmailSettings:FromEmail"];
            var fromName = _config["EmailSettings:FromName"];

            var pdfBytes = _pdfGenerator.GenerateTicketPdf(passengerName, flightNumber, bookingCode);

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(fromName, fromEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = "Vaša avionska karta";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <p>Poštovani {passengerName},</p>
                    <p>U prilogu se nalazi vaša avionska karta za let {flightNumber}.</p>
                    <p>Šifra rezervacije: <strong>{bookingCode}</strong></p>
                    <p>Hvala što letite sa nama!</p>"
            };

            bodyBuilder.Attachments.Add("Karta.pdf", pdfBytes, new ContentType("application", "pdf"));
            message.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(smtpUsername, smtpPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
