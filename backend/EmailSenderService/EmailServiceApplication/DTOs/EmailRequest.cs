using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmailServiceApplication.DTOs
{
    public class EmailRequest
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public int UserId { get; set; }
    }
}