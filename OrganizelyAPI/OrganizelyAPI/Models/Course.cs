﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    [Table("Course")]
    public class Course
    {
        [Key]                                                     
        public int CourseId { get; set; }

        [Required]
        public string CourseName { get; set; }

        public string TeacherName { get; set; }

        [Required]
        public string StartTime { get; set; }

        [Required]
        public string EndTime { get; set; }

        [Required]
        public string DaysOfWeekStr { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime StartRecur { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EndRecur { get; set; }

        [Required]
        public string SemesterSeason { get; set; }

        public int SemesterYear { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

    }
}
