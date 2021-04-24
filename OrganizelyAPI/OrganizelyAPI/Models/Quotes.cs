using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganizelyAPI.Models
{
    [Table("Quotes")]
    public class Quotes
    {
        [Key]
        public int QuoteId { get; set; }

        [Required]
        [Column(TypeName = "varchar(200)")]
        public string Content { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Author { get; set; }
    }
}
