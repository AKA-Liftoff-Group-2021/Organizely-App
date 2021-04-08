using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
   // [Table("Student")]
    public class Student : IdentityUser // THE APPLICATIONUSER
    {
        //[Key]                                                    
        //public int StudentId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        // public ICollection<Course> Courses { get; set; }            // March 18, 2021
        // public ICollection<StudentTask> StudentTasks { get; set; }     // March 18, 2021


        //public override bool Equals(object obj)
        //{
        //    return obj is Student @student &&
        //           Id == @Student.StudentId;
        //}

        //public override int GetHashCode()
        //{
        //    return HashCode.Combine(Id);
        //}
    }
}
