using System;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Newtonsoft.Json;
using EmailServiceInfrastructure.Messaging.Models;
using EmailServiceApplication.Interfaces;
using Microsoft.Extensions.Configuration;
using EmailServiceApplication.DTOs;


namespace EmailServiceInfrastructure.Messaging
{
    public class RabbitMqService
    {
        private readonly IEmailService _emailService;
        private IModel _channel;
        private IConnection _connection;
        private readonly IConfiguration _configuration;


        public RabbitMqService(IEmailService emailService, IConfiguration configuration)
        {
            _emailService = emailService;
            _configuration = configuration;
        }

        public async Task RecieveMessageAsync(string queueName)
        {
            var factory = new ConnectionFactory()
            {
                HostName = _configuration["RabbitMQ:Host"] ?? "localhost",
                Port = int.TryParse(_configuration["RabbitMQ:Port"], out var port) ? port : 5672,
                UserName = _configuration["RabbitMQ:Username"] ?? "guest",
                Password = _configuration["RabbitMQ:Password"] ?? "guest",
                VirtualHost = _configuration["RabbitMQ:VirtualHost"] ?? "/"
            };


            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.QueueDeclare(queue: queueName,
                                            durable: true,
                                            exclusive: false,
                                            autoDelete: false,
                                            arguments: null);

            Console.WriteLine(" [*] Waiting for messages.");

            var consumer = new EventingBasicConsumer(_channel);


            consumer.Received += async (model, ea) =>
            {
                if (ea.Body.Length == 0)
                {
                    Console.WriteLine("Poruka je null.");
                    return;
                }

                var body = ea.Body.ToArray();
                var messageJson = Encoding.UTF8.GetString(body);

                try
                {
                    var message = JsonConvert.DeserializeObject<Message>(messageJson);
                    await _emailService.SendVerificationEmailAsync(message.Email, message.ConfirmationLink);
                    _channel.BasicAck(ea.DeliveryTag, false);
                    Console.WriteLine($" [x] Sent email to {message.Email} with confirmation link.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing message: {ex.Message}");
                    _channel.BasicNack(ea.DeliveryTag, false, true);
                }
            };

            _channel.BasicConsume(queueName, false, consumer);
        }


        public async Task ReceiveTicketMessageAsync(string queueName)
        {
            var factory = new ConnectionFactory()
            {
                HostName = _configuration["RabbitMQ:Host"] ?? "localhost",
                Port = int.TryParse(_configuration["RabbitMQ:Port"], out var port) ? port : 5672,
                UserName = _configuration["RabbitMQ:Username"] ?? "guest",
                Password = _configuration["RabbitMQ:Password"] ?? "guest",
                VirtualHost = _configuration["RabbitMQ:VirtualHost"] ?? "/"
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.QueueDeclare(queue: queueName,
                                durable: true,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);

            Console.WriteLine(" [*] Waiting for ticket messages.");

            var consumer = new EventingBasicConsumer(_channel);

            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var messageJson = Encoding.UTF8.GetString(body);

                try
                {
                    var ticket = JsonConvert.DeserializeObject<TicketRequest>(messageJson);
                    await _emailService.SendTicketEmailAsync(
                        ticket.Email,
                        ticket.PassengerFirstName,
                        ticket.PassengerLastName
                       );

                    _channel.BasicAck(ea.DeliveryTag, false);
                    Console.WriteLine($" [x] Sent ticket email to {ticket.Email}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing ticket message: {ex.Message}");
                    _channel.BasicNack(ea.DeliveryTag, false, true);
                }
            };

            _channel.BasicConsume(queue: queueName, autoAck: false, consumer: consumer);
        }

    }
}
