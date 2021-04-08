using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    public class UserRegistration
    {

        [Required(ErrorMessage = "Username is required")]
        [MaxLength(20), MinLength(2)]
        public string Username { get; set; }

        //[Required]
        [MaxLength(50), MinLength(2)]
        public string FirstName { get; set; }

        //[Required]
        [MaxLength(50), MinLength(2)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
