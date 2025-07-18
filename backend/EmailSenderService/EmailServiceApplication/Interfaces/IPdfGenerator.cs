using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailServiceApplication.Interfaces
{
    public interface IPdfGenerator
    {
        byte[] GenerateTicketPdf(string passengerName);
    }
}