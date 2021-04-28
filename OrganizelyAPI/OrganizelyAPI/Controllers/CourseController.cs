using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizelyAPI.Data;
using OrganizelyAPI.Models;
using OrganizelyAPI.ViewModels;

namespace OrganizelyAPI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]   
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly StudentDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public CourseController(StudentDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
           _userManager = userManager;
        }

        //<summary> Returns all courses associated with a student ID</summary>

        // GET: api/Course
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDTO>>> GetCourses()
        {
            //var user = await _userManager.GetUserAsync(HttpContext.User);
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var courses = await _context.Courses.Where(u => u.UserId == user.Id).Include(u => u.User).Select(c =>    
                   new CourseDTO()
                   {
                       CourseId = c.CourseId,
                       CourseName = c.CourseName,
                       TeacherName = c.TeacherName,
                       StartTime = c.StartTime,
                       EndTime = c.EndTime,
                       DaysOfWeek = c.DaysOfWeekStr.Split(',', System.StringSplitOptions.RemoveEmptyEntries),
                       StartRecur = c.StartRecur,
                       EndRecur = c.EndRecur,
                       SemesterSeason = c.SemesterSeason,
                       SemesterYear = c.SemesterYear,
                       UserId = c.UserId,
                       //User = c.User
                   }).ToListAsync();

            if (courses == null)
            {
                return NotFound();
            }
            return Ok(courses);
        }

        //<summary> Returns course details for a given id</summary>
        // GET: api/Course/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDTO>> GetCourse(int id)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            //var course = await _context.Courses.Where(u => u.UserId == user.Id).Include(u => u.User).Select(c =>
            var course = await _context.Courses.Where(u => u.UserId == user.Id).Include(u => u.User).Select(c =>
                    new CourseDTO()
                    {
                        CourseId = c.CourseId,              
                        CourseName = c.CourseName,
                        TeacherName = c.TeacherName,
                        StartTime = c.StartTime,
                        EndTime = c.EndTime,
                        DaysOfWeek = c.DaysOfWeekStr.Split(',', System.StringSplitOptions.RemoveEmptyEntries),
                        StartRecur = c.StartRecur,
                        EndRecur = c.EndRecur,
                        SemesterSeason = c.SemesterSeason,
                        SemesterYear = c.SemesterYear,
                        UserId = c.UserId,
                        //User = c.User
                    }).SingleOrDefaultAsync(c => c.CourseId == id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }


        // POST: api/Course
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse([FromBody] CourseDTO courseDTO)
        {
            //try this next time: var user = await _userManager.GetUserAsync(HttpContext.User);
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            //var user = await _userManager.FindByIdAsync(courseDTO.UserId);    
            Course newCourse = new()
            {
                CourseName = courseDTO.CourseName,
                TeacherName = courseDTO.TeacherName,
                StartTime = courseDTO.StartTime,
                EndTime = courseDTO.EndTime,
                DaysOfWeekStr = String.Join(",", courseDTO.DaysOfWeek.Select(d => d.ToString()).ToArray()),
                StartRecur = courseDTO.StartRecur,
                EndRecur = courseDTO.EndRecur,
                SemesterSeason = courseDTO.SemesterSeason,
                SemesterYear = courseDTO.SemesterYear,
                UserId = user.Id,
                //User = c.User
            };

            _context.Courses.Add(newCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourse", new { id = newCourse.CourseId }, newCourse);
        }


        // PUT: api/Course/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, [FromBody] CourseDTO courseDTO)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            //var user = await _userManager.FindByIdAsync(courseDTO.UserId); // check if its better to find by user.identity.name
            Course courseToUpdate = await _context.Courses.FindAsync(id);
            if (id != courseToUpdate.CourseId)
            {
                return BadRequest("Request ID does not match any course.");
            }

            courseToUpdate.CourseName = courseDTO.CourseName;
            courseToUpdate.TeacherName = courseDTO.TeacherName;
            courseToUpdate.StartTime = courseDTO.StartTime;
            courseToUpdate.EndTime = courseDTO.EndTime;
            courseToUpdate.DaysOfWeekStr = String.Join(",", courseDTO.DaysOfWeek.Select(d => d.ToString()).ToArray());
            courseToUpdate.StartRecur = courseDTO.StartRecur;
            courseToUpdate.EndRecur = courseDTO.EndRecur;
            courseToUpdate.SemesterSeason = courseDTO.SemesterSeason;
            courseToUpdate.SemesterYear = courseDTO.SemesterYear;
            courseToUpdate.UserId = user.Id;
                //User = c.User

            _context.Entry(courseToUpdate).State = EntityState.Modified; 

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        // DELETE: api/Course/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
            //var user = await _userManager.FindByNameAsync(User.Identity.Name);
            //Where(u => u.UserId == user.Id)

            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return NotFound();
            }

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourseExists(int id)
        {
            return _context.Courses.Any(e => e.CourseId == id);
        }
    }
}
