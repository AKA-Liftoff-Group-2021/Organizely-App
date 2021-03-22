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

        [Column(TypeName = "varchar(100)")]
        public string TeacherName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime StartTime { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EndTime { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string DaysOfWeek { get; set; }

        //public int[] DaysOfWeek
        //{
        //    get
        //    {
        //        return Array.ConvertAll(DaysOfWeekStr.Split(','), Int32.Parse);
        //    }
        //    set
        //    {
        //        DaysOfWeek = value;
        //        DaysOfWeekStr = String.Join(",", DaysOfWeek.Select(d => d.ToString()).ToArray());
        //    }
        //}

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string StartRecur { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string EndRecur { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string SemesterSeason { get; set; }

        [Column(TypeName = "integer")]
        public int SemesterYear { get; set; }

        [Column(TypeName = "integer")]
        //[ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }


       // public ICollection<Assignment> Assignments { get; set; }            // March 18, 2021
    }
}
