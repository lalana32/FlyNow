using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using EmailServiceInfrastructure.Messaging.Models;

namespace EmailServiceInfrastructure.Messaging
{
    public class RabbitMqService
    {

        private readonly EmailService _emailService;  // Referenca na EmailService

    // Konstruktor sa DI injekcijom
        public RabbitMqService(EmailService emailService)
        {
            _emailService = emailService;
        }


        public async Task RecieveMessageAsync(string queueName)
        {
            var factory = new ConnectionFactory { HostName = "localhost" };

            using var connection = await factory.CreateConnectionAsync();
            using var channel = await connection.CreateChannelAsync();

            await channel.QueueDeclareAsync(queue: queueName,
                                            durable: true, 
                                            exclusive: false, 
                                            autoDelete: false, 
                                            arguments: null);

            Console.WriteLine(" [*] Waiting for messages.");

            // Kreiramo potrošača koji će osluškivati nove poruke
            var consumer = new AsyncEventingBasicConsumer(channel);

            // Izmenjeno: koristićemo event za primanje poruke i obraditi je
            consumer.Received += async (model, ea) => 
            {
                var body = ea.Body.ToArray();
                var messageJson = Encoding.UTF8.GetString(body); // Dobijamo poruku kao JSON string

                try
                {
                    // Deseralizujemo JSON poruku u objekat
                    var message = JsonConvert.DeserializeObject<Message>(messageJson); // Dodato: deseralizacija poruke

                    // Pošaljemo email sa potvrdom
                    await _emailService.SendVerificationEmailAsync(message.Email, message.ConfirmationLink); // Dodato: slanje email-a

                    // Potvrda da je poruka uspešno obrađena
                    await channel.BasicAckAsync(ea.DeliveryTag, multiple: false); // Potvrđujemo da je poruka obrađena
                    Console.WriteLine($" [x] Sent email to {message.Email} with confirmation link.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error processing message: {ex.Message}");

                    // Ako dođe do greške, obavestit ćemo RabbitMQ da je poruka neuspešno obrađena
                    await channel.BasicNackAsync(ea.DeliveryTag, multiple: false, requeue: true);
                }
            };

            // Oslanjamo se na već postojeći kod za konzumiranje poruka
            await channel.BasicConsumeAsync(queueName, autoAck: false, consumer: consumer);
        }

    }
}