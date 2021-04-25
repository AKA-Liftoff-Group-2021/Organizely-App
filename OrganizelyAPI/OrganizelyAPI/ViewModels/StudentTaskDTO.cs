using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.ViewModels
{
    public class StudentTaskDTO
    {
        [Required]
        public int StudentTaskId { get; set; }

        [Required]
        public string Priority { get; set; }

        [Required]
        public string StudentTaskName { get; set; }

        [Required]
        public DateTime TaskDueDate { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
