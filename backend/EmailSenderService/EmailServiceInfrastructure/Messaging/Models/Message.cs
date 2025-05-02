using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailServiceInfrastructure.Messaging.Models
{
    public class Message
    {
        public string Email { get; set; }
        public string ConfirmationLink { get; set; }

    }
}