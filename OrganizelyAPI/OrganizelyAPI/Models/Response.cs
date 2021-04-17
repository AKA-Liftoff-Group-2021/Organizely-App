using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    public class Response   // Registration response
    {
            public string Status { get; set; }
            public string Message { get; set; }

        //public bool IsSuccessfulRegistration { get; set; }
        //public IEnumerable<string> Errors { get; set; }
    }

    public class AuthResponse   // Authentication/Login response
    {
        public bool IsAuthSuccessful { get; set; }
        public string ErrorMessage { get; set; }
        public string Token { get; set; }
    }
}
