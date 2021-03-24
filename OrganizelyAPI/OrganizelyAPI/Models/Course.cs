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
        public string CourseName { get; set; }

        public string TeacherName { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime StartTime { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EndTime { get; set; }

        [Required]
        public string DaysOfWeekStr { get; set; }

        //[NotMapped]
        //public string[] DaysOfWeek { get; set; }
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

        [Column(TypeName = "datetime")]
        public DateTime StartRecur { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime EndRecur { get; set; }

        [Required]
        public string SemesterSeason { get; set; }

        public int SemesterYear { get; set; }

        //[Column(TypeName = "integer")]
        //[ForeignKey("Student")]
        public int StudentId { get; set; }
        public Student Student { get; set; }


       // public ICollection<Assignment> Assignments { get; set; }            // March 18, 2021
    }
}
