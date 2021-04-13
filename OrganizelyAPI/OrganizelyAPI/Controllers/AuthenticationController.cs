using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OrganizelyAPI.Data;
using OrganizelyAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;

namespace OrganizelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<Student> _signInManager;
        private readonly IConfiguration _configuration;
        // private readonly ApplicationSettings _appSettings; //appSettings.value then add IOptions<ApplicationSettings> in the arguments 

        public AuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<Student> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

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

                //var errors = result.Errors.Select(e => e.Description);
                //return BadRequest(new Response { Errors = errors });
            }

            return Ok(new Response { Status = "Success", Message = "New user created successfully." });
            //return StatusCode(201);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {

            var existingUser = await _userManager.FindByNameAsync(userLogin.Username);

            if (existingUser != null || await _userManager.CheckPasswordAsync(existingUser, userLogin.Password))
            {
                var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JWTSettings:Secret").Value); // or use applicationsettings
                var secret = new SymmetricSecurityKey(key);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new List<Claim>
                   {
                        new Claim(ClaimTypes.Name, userLogin.Username),
                        //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256)
                };

                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var securityToken = jwtTokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = jwtTokenHandler.WriteToken(securityToken);
                //return Ok(jwtToken); // returns the token as the body
                //return Ok(new { token = jwtToken }); // returns the token as a JSON body with "token" as property and the actual token as value
                return Ok(new AuthResponse { IsAuthSuccessful = true, Token = jwtToken });
            }

            return Unauthorized(new AuthResponse { ErrorMessage = "Invalid Authentication" });
            //return Unauthorized();
        }
    }
