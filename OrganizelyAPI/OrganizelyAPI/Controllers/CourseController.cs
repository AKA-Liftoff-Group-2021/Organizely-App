using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizelyAPI.Data;
using OrganizelyAPI.Models;
using OrganizelyAPI.ViewModels;

namespace OrganizelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public CourseController(StudentDbContext context)
        {
            _context = context;
        }

        // GET: api/Course
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        {
            return await _context.Courses
                .Include(s => s.Student)            // TODO: Added march18
                .ToListAsync();
        }

        // GET: api/Course/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Course>> GetCourse(int id)
        {
            // TODO: Include student so it doesn't show as null ?
            //.Include(c => c.DaysOfWeek = Array.ConvertAll(c.DaysOfWeek.Split(','), Int32.Parse))
            //var course = await _context.Courses   // returns a list so this is wrong
            //  .Where(c => c.CourseId == id)
            // .Include(s => s.Student)
            // .ToListAsync();

            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

        // PUT: api/Course/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourse(int id, Course course)
        {
            if (id != course.CourseId)
            {
                return BadRequest();
            }

            _context.Entry(course).State = EntityState.Modified;

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

        // POST: api/Course
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(CourseDTO courseDTO)            //march 22
        {
            Student theStudent = _context.Students.Find(courseDTO.StudentId);          //march 22
            Course newCourse = new Course
            {
                CourseName = courseDTO.CourseName,
                TeacherName = courseDTO.TeacherName,
                StartTime = courseDTO.StartTime,
                EndTime = courseDTO.EndTime,
                DaysOfWeek = String.Join(",", courseDTO.DaysOfWeek.Select(d => d.ToString()).ToArray()),
                StartRecur = courseDTO.StartRecur,
                EndRecur = courseDTO.EndRecur,
                SemesterSeason = courseDTO.SemesterSeason,
                SemesterYear = courseDTO.SemesterYear,
                Student = theStudent
            };

            _context.Courses.Add(newCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourse", new { id = newCourse.CourseId }, newCourse);
        }

        // DELETE: api/Course/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourse(int id)
        {
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
