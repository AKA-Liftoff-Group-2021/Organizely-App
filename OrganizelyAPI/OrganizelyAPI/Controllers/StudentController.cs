using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OrganizelyAPI.Data;
using OrganizelyAPI.Models;
using OrganizelyAPI.ViewModels;

namespace OrganizelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        //private readonly StudentDbContext _context;

        //public StudentController(StudentDbContext context)
        //{
        //    _context = context;
        //}

        private readonly UserManager<ApplicationUser> _userManager;

        public StudentController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }


        [Authorize]
        [HttpGet]
        // GET: api/Student
        //[HttpGet("{id}")]
        // GET: api/Student/5
        // [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.Unauthorized)] 
        public async Task<Object> GetStudent() // (int id)
        {
           // string username = User. First(u => u.Type == "Username").Value; // WRONG, TODO: CHANGE VALUE
            string username = User.Claims.First(u => u.Type == "Username").Value;
            var student = await _userManager.FindByNameAsync(username);
            //or  var user = await _userManager.FindByEmailAsync(User.Identity.Name);
            //var student = await _userManager.Students.Select(s =>
            //       new StudentDTO()
            //       {
            //           StudentId = s.StudentId,
            //           Username = s.Username,
            //           FirstName = s.FirstName,
            //           LastName = s.LastName,
            //       }).SingleOrDefaultAsync(s => s.StudentId == id);

            if (student == null)
            {
                return NotFound();
            }

            //return Ok(student);
            return new
            {
                //student.Id,
                student.FirstName,
                student.LastName,
                student.UserName,
                student.Email
            };
        }


        //// POST: api/Student
        //[HttpPost]
        //public async Task<ActionResult<Student>> PostStudent([FromBody] StudentDTO studentdto)
        //{
        //    Student newStudent = new()
        //    {
        //        //Username = studentdto.Username,
        //        FirstName = studentdto.FirstName,
        //        LastName = studentdto.LastName
        //    };
        //    _context.Students.Add(newStudent);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetStudent", new { id = newStudent.StudentId }, newStudent);
        //}

        //// PUT: api/Student/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutStudent(int id, [FromBody] StudentDTO studentdto)
        //{
        //    Student studentToUpdate = await _context.Students.FindAsync(id);
        //    if (id != studentToUpdate.StudentId)
        //    {
        //        return BadRequest("Request ID does not match any student.");
        //    }

        //    studentToUpdate.Username = studentdto.Username;
        //    studentToUpdate.FirstName = studentdto.FirstName;
        //    studentToUpdate.LastName = studentdto.LastName;

        //    _context.Entry(studentToUpdate).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!StudentExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// DELETE: api/Student/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteStudent(int id)
        //{
        //    var student = await _context.Students.FindAsync(id);
        //    if (student == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Students.Remove(student);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool StudentExists(int id)
        //{
        //    return _context.Students.Any(e => e.StudentId == id);
        //}

    }
}
