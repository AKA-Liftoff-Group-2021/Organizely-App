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
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public StudentController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        // GET: api/Student
        // [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.Unauthorized)] 
        public async Task<IActionResult> GetStudent() // (int id)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            if (user == null)
            {
                return NotFound();
            }

            StudentDTO student = new()
            {
                Username = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
            return Ok(student);
        }

        //// DELETE: api/Student/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteStudent(int id)//or username
        //{
        //    var user = await _userManager.FindByNameAsync(User.Identity.Name);//or findbyId
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.AspNetUsers.Remove(user);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool StudentExists(int id)
        //{
        //    return _context.AspNetUsers.Any(e => e.Id == id);
        //}


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



    }
}
