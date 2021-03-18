using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    [Table("Student")]
    public class Student
    {
        [Key]                                                     // ctrl + . to select options to add namespaces
        public int StudentId { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Username { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string FirstName { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string LastName { get; set; }


        public ICollection<Course> Courses { get; set; }            // March 18, 2021


        // TODO Should I add an ICollection of Assignments 

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
