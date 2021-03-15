using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    [Table("StudentTask")]
    public class StudentTask
    {
        [Key]                                                     // ctrl + . to select options to add namespaces
        public int StudentTaskId { get; set; }

        [Column(TypeName = "varchar(100)")]
        public string StudentTaskName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime Time { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? Deadline { get; set; }

        [Column(TypeName = "integer")]
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
