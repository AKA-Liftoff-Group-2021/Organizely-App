using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.ViewModels
{
    public class StudentTaskDTO
    {
        public int StudentTaskId { get; set; }

        public string Priority { get; set; }

        public string StudentTaskName { get; set; }

        public DateTime TaskDueDate { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
