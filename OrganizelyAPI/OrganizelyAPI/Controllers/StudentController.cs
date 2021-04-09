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
        //private readonly StudentDbContext _context;

        //public StudentController(StudentDbContext context)
        //{
        //    _context = context;
        //}

        private readonly UserManager<Student> _userManager;
        private readonly SignInManager<Student> _signInManager;
        private readonly IConfiguration _configuration;  

        public StudentController(UserManager<Student> userManager, SignInManager<Student> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
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
                SecurityStamp = Guid.NewGuid().ToString(),
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

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {

            var existingUser = await _userManager.FindByNameAsync(userLogin.Username);

            if (existingUser == null || !await _userManager.CheckPasswordAsync(existingUser, userLogin.Password))
            {
                var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JWTSettings:Secret").Value);
                var secret = new SymmetricSecurityKey(key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new List<Claim>
                   {
                        new Claim(ClaimTypes.Name, userLogin.Username),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    SigningCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256)
                };
                return Ok();
            }
            else
            {
                //if (existingUser == null || !await _userManager.CheckPasswordAsync(existingUser, userLogin.Password))
                return Unauthorized(); // return Unauthorized(new Response { Message = "Invalid Authentication" });
            }


  

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
