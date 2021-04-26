using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.ViewModels
{
    public class AssignmentDTO
    {
        [Required]
        public int AssignmentId { get; set; }

        [Required]
        public string AssignmentName { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public int CourseId { get; set; }

        //[Required]
        public Course Course { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}
