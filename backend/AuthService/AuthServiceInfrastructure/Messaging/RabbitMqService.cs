using Newtonsoft.Json;
using RabbitMQ.Client;
using System.Text;

namespace AuthServiceInfrastructure.Messaging
{
    public class RabbitMqService : IRabbitMqService
    {
        public async Task SendMessageAsync(string queueName, string email, string userId, string confirmationToken)
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
                    ConfirmationLink = $"http://localhost:5001/api/Auth/confirm?userId={userId}&token={System.Web.HttpUtility.UrlEncode(confirmationToken)}",
                };


                var messageJson = JsonConvert.SerializeObject(messageObject); 

                var body = Encoding.UTF8.GetBytes(messageJson);

                await channel.BasicPublishAsync(exchange: string.Empty, routingKey: queueName, body: body);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending message: {ex.Message}");
            }
        }
    }
}
