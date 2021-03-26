using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.ViewModels
{
   
    public class StudentDTO
    {
        [Key]                                                    
        public int StudentId { get; set; }

        [Required]
        //[Column(TypeName = "varchar(100)")]
        public string Username { get; set; }

        [Required]
        //[Column(TypeName = "varchar(100)")]
        public string FirstName { get; set; }

        [Required]
        //[Column(TypeName = "varchar(100)")]
        public string LastName { get; set; }

       // public ICollection<Course> Courses { get; set; }           
       // public ICollection<StudentTask> StudentTasks { get; set; }
    }
}
