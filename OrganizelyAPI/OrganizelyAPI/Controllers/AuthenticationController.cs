﻿using Microsoft.AspNetCore.Http;
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
using System.Text;

namespace OrganizelyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        // private readonly ApplicationSettings _appSettings; //appSettings.value then add IOptions<ApplicationSettings> in the arguments 

        public AuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        // POST : /api/Authentication/Register
        public async Task<IActionResult> Register([FromBody] UserRegistration userRegistration)
        {
            var userExists = await _userManager.FindByNameAsync(userRegistration.Username);
            if (userExists != null)
            {
                return BadRequest(new Response { Message = "User already exists." }); 
            }

            ApplicationUser newUser = new()
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
                var errors = newUserCreated.Errors.Select(e => e.Description);
                return BadRequest(new Response { Message = "", Errors = errors });
            }

            return Ok(new Response { Message = "New user created successfully." });
        }

        [HttpPost]
        [Route("Login")]
        // POST : /api/Authentication/Login
        public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
        {

            var existingUser = await _userManager.FindByNameAsync(userLogin.Username);
            if (existingUser != null && await _userManager.CheckPasswordAsync(existingUser, userLogin.Password))
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
                    Expires = DateTime.UtcNow.AddHours(6),
                    SigningCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256)
                };

                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var securityToken = jwtTokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = jwtTokenHandler.WriteToken(securityToken);
               
                return Ok(new AuthResponse { Token = jwtToken });
            }

            return Unauthorized(new AuthResponse { ErrorMessage = "Login failed, unathorized user." });
        }
    }
}
