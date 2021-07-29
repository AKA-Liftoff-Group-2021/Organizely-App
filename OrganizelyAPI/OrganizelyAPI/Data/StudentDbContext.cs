using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OrganizelyAPI.Models;

namespace OrganizelyAPI.Data
{
    public class StudentDbContext : IdentityDbContext<ApplicationUser> 
    {
        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<StudentTask> StudentTasks { get; set; }
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<Quotes> QuoteSet { get; set; }
    }
}
