using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.ViewModels
{
    public class CourseDTO
    {
        [Key]                                                    
        public int CourseId { get; set; }

        [Required]
        [MaxLength(80), MinLength(2)]
        public string CourseName { get; set; }

        [MaxLength(70), MinLength(2)]
        public string TeacherName { get; set; }

        [Required]
        public string StartTime { get; set; }

        [Required]
        public string EndTime { get; set; }

        [NotMapped]
        [MaxLength(7)]
        public string[] DaysOfWeek { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime StartRecur { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EndRecur { get; set; }

        [Required]
        [MaxLength(35), MinLength(4)]
        public string SemesterSeason { get; set; }

        public int SemesterYear { get; set; }


        //[ForeignKey("Student")]
        //public string StudentId { get; set; }              // temporarily hide until user sign up is set up
        //public Student Student { get; set; }


        // public ICollection<Assignment> Assignments { get; set; }  // March 18, 2021, deleted as this might cause circular references
    }
}
