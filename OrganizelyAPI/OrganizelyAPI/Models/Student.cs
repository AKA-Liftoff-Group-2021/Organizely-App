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
        public string StudentName { get; set; }
    }
}
