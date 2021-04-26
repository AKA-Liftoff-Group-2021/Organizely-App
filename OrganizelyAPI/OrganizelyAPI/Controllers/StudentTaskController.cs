using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrganizelyAPI.Data;
using OrganizelyAPI.Models;
using OrganizelyAPI.ViewModels;
using Microsoft.AspNetCore.Identity;

namespace OrganizelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentTaskController : ControllerBase
    {
        private readonly StudentDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public StudentTaskController(StudentDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/StudentTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentTaskDTO>>> GetStudentTasks()
        {
            //Student theStudent = await _context.Courses.FindAsync(StudentTask.StudentId);
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var studentTasks = await _context.StudentTasks.Where(u => u.UserId == user.Id).Include(u => u.User).Select(s =>
             new StudentTaskDTO()
             {
                 StudentTaskId = s.StudentTaskId,
                 StudentTaskName = s.StudentTaskName, 
                 TaskDueDate = s.TaskDueDate,
                 Priority = s.Priority,
                 UserId = s.UserId,   // Newly added..
              // StudentId = s.StudentId,

             }).ToListAsync();

            if (studentTasks == null)
            {
                return NotFound();
            }
            return studentTasks;
        }

        // GET: api/StudentTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentTaskDTO>> GetStudentTask(int id)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var studentTask = await _context.StudentTasks.Where(u => u.UserId == user.Id).Include(u => u.User).Select(s =>
            new StudentTaskDTO()
            {
                StudentTaskId = s.StudentTaskId,
                StudentTaskName = s.StudentTaskName,
                TaskDueDate = s.TaskDueDate,
                Priority = s.Priority,
                UserId = s.UserId,    // Newly added..
            //  StudentId = s.StudentId,

            }).FirstOrDefaultAsync(s => s.StudentTaskId == id);

            if (studentTask == null)
            {
                return NotFound();
            }

            return studentTask;
        }

        // PUT: api/StudentTask/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentTask(int id, StudentTaskDTO studentTaskDTO)
        {
            StudentTask taskToUpdate = await _context.StudentTasks.FindAsync(id);

            if (id != taskToUpdate.StudentTaskId)
            {
                return BadRequest("Task Id does not match any task.");
            }

            taskToUpdate.Priority = studentTaskDTO.Priority;
            taskToUpdate.StudentTaskName = studentTaskDTO.StudentTaskName;
            taskToUpdate.TaskDueDate = studentTaskDTO.TaskDueDate;
            taskToUpdate.UserId = studentTaskDTO.User.Id; // Added UserId
            //student 
            _context.Entry(taskToUpdate).State = EntityState.Modified;

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
        [HttpPost]
        public async Task<ActionResult<StudentTaskDTO>> PostStudentTask(StudentTaskDTO studentTaskDTO)
        {
            StudentTask newStudentTask = new StudentTask
            {
                StudentTaskName = studentTaskDTO.StudentTaskName,
                TaskDueDate = studentTaskDTO.TaskDueDate,
                Priority = studentTaskDTO.Priority,
                UserId = studentTaskDTO.UserId, // Added UserId
            };

            _context.StudentTasks.Add(newStudentTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentTask", new { id = newStudentTask.StudentTaskId }, newStudentTask);
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
