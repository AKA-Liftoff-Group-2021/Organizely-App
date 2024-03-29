﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    [Table("Assignment")]
    public class Assignment
    {
        [Key]                                                    
        public int AssignmentId { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string AssignmentName { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime DueDate { get; set; }

        [ForeignKey("CourseId")]
        public int CourseId { get; set; }
        public Course Course { get; set; }

        //[ForeignKey("UserId")]            // this is not needed, it is not directly related to the userId
        //public string UserId { get; set; }
        //public ApplicationUser User { get; set; }
    }
}
