using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingServiceInfrastructure.Messaging
{
    public interface IRabbitMqService
    {
        Task SendMessageAsync(string queueName, string email,string passengerFirstName, string passengerLastName);
    }
}