using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.ViewModels
{
    public class AssignmentDTO
    {
        public int AssignmentId { get; set; }

        public string AssignmentName { get; set; }

        public DateTime DueDate { get; set; }

        public int CourseId { get; set; }

        public Course Course { get; set; }
    }
}
