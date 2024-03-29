﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssignmentController : ControllerBase
    {
        private readonly StudentDbContext _context;

        private readonly UserManager<ApplicationUser> _userManager;

        public AssignmentController(StudentDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Assignment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssignmentDTO>>> GetAssignments()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var assignments = await (from Assignment in _context.Assignments
                                join Course in _context.Courses
                                on Assignment.CourseId equals Course.CourseId
                                where Course.UserId == user.Id
                                select new AssignmentDTO
                                {
                                    AssignmentId = Assignment.AssignmentId,
                                    AssignmentName = Assignment.AssignmentName,
                                    DueDate = Assignment.DueDate,
                                    CourseId = Course.CourseId,
                                    Course = Course
                                }).ToListAsync();

            if (assignments == null)
            {
                return NotFound();
            }

            return assignments;
        }

        // GET: api/Assignment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AssignmentDTO>> GetAssignment(int id)
        {

            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var assignment = await (from Assignment in _context.Assignments
                                     join Course in _context.Courses
                                     on Assignment.CourseId equals Course.CourseId
                                     where Course.UserId == user.Id
                                     select new AssignmentDTO
                                     {
                                         AssignmentId = Assignment.AssignmentId,
                                         AssignmentName = Assignment.AssignmentName,
                                         DueDate = Assignment.DueDate,
                                         CourseId = Course.CourseId,
                                         Course = Course
                                     }).SingleOrDefaultAsync(a => a.AssignmentId == id);

            if (assignment == null)
            {
                return NotFound();
            }

            return assignment;
        }

        // PUT: api/Assignment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAssignment(int id, AssignmentDTO assignmentDTO)
        { 
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var assignmentToUpdate = await (from Assignment in _context.Assignments
                                    join Course in _context.Courses
                                    on Assignment.CourseId equals Course.CourseId
                                    where Course.UserId == user.Id
                                    select new Assignment
                                    {
                                        AssignmentId = Assignment.AssignmentId,
                                        AssignmentName = Assignment.AssignmentName,
                                        DueDate = Assignment.DueDate,
                                        CourseId = Course.CourseId,
                                        Course = Course
                                    }).SingleOrDefaultAsync(a => a.AssignmentId == id);

            if (id != assignmentToUpdate.AssignmentId)
            {
                return BadRequest("Requested Id does not match any assignment.");
            }

            assignmentToUpdate.AssignmentName = assignmentDTO.AssignmentName;
            assignmentToUpdate.DueDate = assignmentDTO.DueDate;
            assignmentToUpdate.CourseId = assignmentDTO.CourseId;

            _context.Entry(assignmentToUpdate).State = EntityState.Modified;

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
            Course theCourse = await _context.Courses.FindAsync(assignmentDTO.CourseId);

            Assignment newAssignment = new Assignment
            {
                AssignmentName = assignmentDTO.AssignmentName,
                DueDate = assignmentDTO.DueDate,
                Course = theCourse,
                CourseId = theCourse.CourseId
            };

            _context.Assignments.Add(newAssignment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAssignment", new { id = newAssignment.AssignmentId }, newAssignment);
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
