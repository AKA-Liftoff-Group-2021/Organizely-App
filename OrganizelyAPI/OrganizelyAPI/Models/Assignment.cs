using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    [Table("Assignment")]
    public class Assignment
    {
        [Key]                                                     // ctrl + . to select options to add namespaces
        public int AssignmentId { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string AssignmentName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime Time { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime Deadline { get; set; }

        [Column(TypeName = "integer")]
        //[ForeignKey]
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
