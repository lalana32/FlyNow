using System;
using System.Text;        
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RabbitMQ.Client;
using Newtonsoft.Json;


namespace BookingServiceInfrastructure.Messaging
{
    public class RabbitMqService : IRabbitMqService
    {
        public async Task SendMessageAsync(string queueName, string email, string passengerFirstName,
        string passengerLastName)
        {
            var factory = new ConnectionFactory
            {
                HostName = "rabbitmq",
                UserName = "guest",
                Password = "guest",
                VirtualHost = "/"
            };

            try
            {
                await using var connection = await factory.CreateConnectionAsync();
                await using var channel = await connection.CreateChannelAsync();

                await channel.QueueDeclareAsync(queue: queueName,
                                                durable: true,
                                                exclusive: false,
                                                autoDelete: false,
                                                arguments: null);


                var messageObject = new
                {
                    Email = email,
                    PassengerFirstName = passengerFirstName,
                    PassengerLastName = passengerLastName,
                };

                var messageJson = JsonConvert.SerializeObject(messageObject);
                var body = Encoding.UTF8.GetBytes(messageJson);

                await channel.BasicPublishAsync(exchange: string.Empty,
                                                routingKey: "ticket_email_queue",
                                                body: body);

            }
            catch (Exception ex)
            {
                Console.WriteLine($"[RabbitMQ] Error sending ticket: {ex.Message}");
            }
        }
    }
}