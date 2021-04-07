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
    public class AssignmentController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public AssignmentController(StudentDbContext context)
        {
            _context = context;
        }

        // GET: api/Assignment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssignmentDTO>>> GetAssignments()
        {
            var assignment = await _context.Assignments.Select(a =>
            new AssignmentDTO()
            {
                AssignmentId = a.AssignmentId, 
                AssignmentName = a.AssignmentName,
                DueDate = a.DueDate,
                CourseId = a.CourseId,

            }).ToListAsync();

            return assignment;
        }

        // GET: api/Assignment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssignmentDTO>> GetAssignment(int id)
        {
            //var assignment = await _context.Assignments.FindAsync(id);
            var assignment = await _context.Assignments.Select(a =>
                        new AssignmentDTO()
                        {
                            AssignmentId = a.AssignmentId,
                            AssignmentName = a.AssignmentName,
                            DueDate = a.DueDate,
                            CourseId = a.CourseId,

                        }).SingleOrDefaultAsync(a => a.AssignmentId == id);

            if (assignment == null)
            {
                return NotFound("Assignment Not Found");
            }
            return assignment;
        }

        // PUT: api/Assignment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssignment(int id, AssignmentDTO assignmentDTO)
        {
            if (id != assignmentDTO.AssignmentId)
            {
                return BadRequest("Assignment is not found.");
            }

            _context.Entry(assignmentDTO).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssignmentExists(id))
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

        // POST: api/Assignment
        [HttpPost]
        public async Task<ActionResult<AssignmentDTO>> PostAssignment(AssignmentDTO assignmentDTO)
        {
            Assignment newAssignment = new Assignment
            {
                AssignmentName = assignmentDTO.AssignmentName,
                DueDate = assignmentDTO.DueDate,
            };

            _context.Assignments.Add(newAssignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssignment", new { id = newAssignment.AssignmentId }, assignmentDTO);
        }

        // DELETE: api/Assignment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssignment(int id)
        {
            var assignment = await _context.Assignments.FindAsync(id);
            if (assignment == null)
            {
                return NotFound();
            }

            _context.Assignments.Remove(assignment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssignmentExists(int id)
        {
            return _context.Assignments.Any(e => e.AssignmentId == id);
        }
    }
}
