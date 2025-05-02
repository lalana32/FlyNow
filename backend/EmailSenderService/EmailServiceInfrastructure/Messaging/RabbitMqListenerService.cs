using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailServiceInfrastructure.Messaging
{
    public class RabbitMqListenerService : BackgroundService
    {
        private readonly RabbitMqService _rabbitMqService;

        public RabbitMqListenerService(RabbitMqService rabbitMqService)
        {
            _rabbitMqService = rabbitMqService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await _rabbitMqService.RecieveMessageAsync("email_queue"); // ili koristi QueueNames.EmailQueue
        }
    }
}