using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;


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
            var task1 = _rabbitMqService.RecieveMessageAsync("email_queue");
            var task2 = _rabbitMqService.ReceiveTicketMessageAsync("ticket_email_queue");
            
            await Task.WhenAll(task1, task2);
        }
    }
}