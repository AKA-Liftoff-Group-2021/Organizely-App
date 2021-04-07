using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.ViewModels
{
    public class StudentTaskDTO
    {
        public int StudentTaskId { get; set; }

        public string TaskPriorityLevel { get; set; }

        public string StudentTaskName { get; set; }

        public DateTime TaskDueDate { get; set; }


        /*public int StudentId { get; set; } <<(Hidden until sign up is completed)
        public Student Student { get; set; }*/
    }
}
