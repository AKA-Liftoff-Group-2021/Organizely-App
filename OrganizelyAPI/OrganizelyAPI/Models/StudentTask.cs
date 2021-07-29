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

        [Required]
        [Column(TypeName = "Priority")]
        public string Priority { get; set; }

        [Required]
        [Column(TypeName = "varchar(30)")]
        public string StudentTaskName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime TaskDueDate { get; set; } 

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
