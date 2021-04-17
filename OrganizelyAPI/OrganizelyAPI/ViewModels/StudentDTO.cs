//using OrganizelyAPI.Models;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Threading.Tasks;

//namespace OrganizelyAPI.ViewModels
//{
   
//    public class StudentDTO
//    {
//        [Key]                                                    
//        public int StudentId { get; set; }

//        [Required(ErrorMessage = "Username is required")]
//        [MaxLength(20), MinLength(2)]
//        public string Username { get; set; }

//        //[Required]
//        [MaxLength(50), MinLength(2)]
//        public string FirstName { get; set; }

//        //[Required]
//        [MaxLength(50), MinLength(2)]
//        public string LastName { get; set; }

//        [Required(ErrorMessage = "Email is required.")]
//        public string Email { get; set; }

//        [Required(ErrorMessage = "Password is required")]
//        public string Password { get; set; }

//        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
//        public string ConfirmPassword { get; set; }

//        // public ICollection<Course> Courses { get; set; }           
//        // public ICollection<StudentTask> StudentTasks { get; set; }
//    }
//}
