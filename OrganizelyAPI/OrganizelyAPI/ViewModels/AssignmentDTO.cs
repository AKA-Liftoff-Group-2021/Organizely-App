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

        //[Required] // no need to add required, ef core knows it is a foreign key, you can add the attribute [ForeignKey("CourseId")] but that is optional
        //public int CourseId { get; set; }

        ////[Required] // no need to add required, ef core knows it is a foreign key
        //public Course Course { get; set; }

        //[ForeignKey("UserId")]  // this is not needed, it is not directly related to the userId
        //public string UserId { get; set; }
        //public ApplicationUser User { get; set; }

        [ForeignKey("CourseId")]
        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}
