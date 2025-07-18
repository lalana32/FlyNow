using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailServiceApplication.DTOs
{
    public class TicketRequest
{
    public string Email { get; set; }
    public string PassengerFirstName { get; set; }
    public string PassengerLastName { get; set; }
}

}