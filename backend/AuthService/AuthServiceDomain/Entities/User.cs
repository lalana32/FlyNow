using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthServiceDomain.Entities
{
    public class User
    {
        public string FirstName { get; set; }    
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }   
    }

}