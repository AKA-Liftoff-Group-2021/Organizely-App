﻿//using Microsoft.AspNetCore.Identity;
//using System;
//using System.Collections.Generic;
//using System.ComponentModel.DataAnnotations;
//using System.ComponentModel.DataAnnotations.Schema;
//using System.Linq;
//using System.Threading.Tasks;

//namespace OrganizelyAPI.Models
//{
//   [Table("Student")]
//    public class Student //: IdentityUser 
//    {

//        [Key]
//        public int StudentId { get; set; }

//        //[Required]
//        public string FirstName { get; set; }

//        //[Required]
//        public string LastName { get; set; }

//        [Required(ErrorMessage = "Email is required.")]
//        public string Email { get; set; }

//        [Required(ErrorMessage = "Username is required")]
//        [MaxLength(20), MinLength(2)]
//        public string Username { get; set; }


//        //public override bool Equals(object obj)
//        //{
//        //    return obj is Student @student &&
//        //           Id == @Student.StudentId;
//        //}

//        //public override int GetHashCode()
//        //{
//        //    return HashCode.Combine(Id);
//        //}
//    }
//}
