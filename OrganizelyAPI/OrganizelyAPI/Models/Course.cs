using System;
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
        [Key]                                                     // ctrl + . to select options to add namespaces
        public int CourseId { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string CourseName { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string TeacherName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime StartTime { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EndTime { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime DateStart { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime DateEnd { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string SemesterSeason { get; set; }

        [Column(TypeName = "integer")]
        public int SemesterYear { get; set; }

        [Column(TypeName = "integer")]
        //[ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }
    }
}
