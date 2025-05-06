using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthServiceInfrastructure.Messaging
{
    public interface IRabbitMqService
    {
        Task SendMessageAsync(string queueName, string email,string userId, string confirmationToken);
    }
}