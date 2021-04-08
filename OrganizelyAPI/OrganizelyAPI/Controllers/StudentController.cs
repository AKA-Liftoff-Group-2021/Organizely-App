﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    public class StudentController : ControllerBase
    {
        //private readonly StudentDbContext _context;

        //public StudentController(StudentDbContext context)
        //{
        //    _context = context;
        //}

        private readonly UserManager<Student> _userManager;
        private readonly SignInManager<Student> _signInManager;
        // or private readonly IConfiguration _configuration;  

        public StudentController(UserManager<Student> userManager, SignInManager<Student> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        //public StudentController(UserManager<Student> userManager, IConfiguration configuration)
        //{
        //    _userManager = userManager;
        //    _configuration = configuration;
        //}


        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistration userRegistration)
        {
            var userExists = await _userManager.FindByNameAsync(userRegistration.Username);
            if (userExists != null || !ModelState.IsValid)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response
                { Status = "Error", Message = "User already exists!" });
            }

            Student newUser = new Student()
            {
                Email = userRegistration.Email,
                //SecurityStamp = Guid.NewGuid().ToString(),
                UserName = userRegistration.Username,
                FirstName = userRegistration.FirstName,
                LastName = userRegistration.LastName
            };

            var newUserCreated = await _userManager.CreateAsync(newUser, userRegistration.Password);

            if (!newUserCreated.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response
                { Status = "Error", Message = "User creation failed. Please check user details and try again." });
            }

            return Ok(new Response { Status = "Success", Message = "New user created successfully." });
        }













        //// GET: api/Student/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<StudentDTO>> GetStudent(int id)
        //{
        //    var student = await _context.Students.Select(s =>         
        //           new StudentDTO()                                              
        //           {
        //               StudentId = s.StudentId,
        //               //Username = s.Username,
        //               FirstName = s.FirstName,
        //               LastName = s.LastName,
        //            }).SingleOrDefaultAsync(s => s.StudentId == id);

        //    if (student == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(student);
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

        //    //studentToUpdate.Username = studentdto.Username;
        //    //studentToUpdate.FirstName = studentdto.FirstName;
        //    //studentToUpdate.LastName = studentdto.LastName;

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

        //// POST: api/Student
        //[HttpPost]
        //public async Task<ActionResult<Student>> PostStudent([FromBody] StudentDTO studentdto)
        //{
        //    Student newStudent = new Student
        //    {
        //        //Username = studentdto.Username,
        //        FirstName = studentdto.FirstName,
        //        LastName = studentdto.LastName
        //    };
        //    _context.Students.Add(newStudent);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetStudent", new { id = newStudent.StudentId }, newStudent);
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
