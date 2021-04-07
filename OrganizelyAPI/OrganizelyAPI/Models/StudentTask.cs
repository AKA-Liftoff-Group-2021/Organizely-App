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
        [Key]                                                    
        public int StudentTaskId { get; set; }

        //[Required]
        [Column(TypeName = "Priority")]
        public string TaskPriorityLevel { get; set; }

        [Required]
        [Column(TypeName = "varchar(30)")]
        public string StudentTaskName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime TaskDueDate { get; set; } // There was a DateTime? here..

        /*[Column(TypeName = "integer")]   <<(Hidden until sign up is completed)
        public int StudentId { get; set; }
        public Student Student { get; set; }*/
    }
}
