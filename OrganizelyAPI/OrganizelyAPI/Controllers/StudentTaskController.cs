using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizelyAPI.Data;
using OrganizelyAPI.Models;

namespace OrganizelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentTaskController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public StudentTaskController(StudentDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentTask>>> GetStudentTasks()
        {
            return await _context.StudentTasks.ToListAsync();
        }

        // GET: api/StudentTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentTask>> GetStudentTask(int id)
        {
            var studentTask = await _context.StudentTasks.FindAsync(id);

            if (studentTask == null)
            {
                return NotFound();
            }

            return studentTask;
        }

        // PUT: api/StudentTask/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentTask(int id, StudentTask studentTask)
        {
            if (id != studentTask.StudentTaskId)
            {
                return BadRequest();
            }

            _context.Entry(studentTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentTaskExists(id))
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

        // POST: api/StudentTask
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentTask>> PostStudentTask(StudentTask studentTask)
        {
            _context.StudentTasks.Add(studentTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentTask", new { id = studentTask.StudentTaskId }, studentTask);
        }

        // DELETE: api/StudentTask/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentTask(int id)
        {
            var studentTask = await _context.StudentTasks.FindAsync(id);
            if (studentTask == null)
            {
                return NotFound();
            }

            _context.StudentTasks.Remove(studentTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentTaskExists(int id)
        {
            return _context.StudentTasks.Any(e => e.StudentTaskId == id);
        }
    }
}
