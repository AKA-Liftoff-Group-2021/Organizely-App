﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private readonly StudentDbContext _context;

        private readonly UserManager<ApplicationUser> _userManager;
        public QuotesController(StudentDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }


        // GET: api/Quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuotesDTO>>> GetQuotes() //s
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var quotes = await _context.QuoteSet.Where(u => u.UserId == user.Id).Include(u => u.User).Select(q =>
            
            new QuotesDTO()
            {
                QuoteId = q.QuoteId,
                Content = q.Content,
                Author = q.Author,
                UserId = q.UserId,

            }).ToListAsync();

            if (quotes == null)
            {
                return NotFound();
            }
            return quotes; 
        }

        // GET: api/Quotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuotesDTO>> GetQuotes(int id)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var quote = await _context.QuoteSet.Where(u => u.UserId == user.Id).Include(u => u.User).Select(q => 
                new QuotesDTO()
                {
                    QuoteId = q.QuoteId,
                    Content = q.Content,
                    Author = q.Author,
                    UserId = q.UserId,

                }).SingleOrDefaultAsync(q => q.QuoteId == id);

            if (quote == null)
            {
                return NotFound();
            }

            return Ok(quote);
        }

        // PUT: api/Quotes/5
        /*[HttpPut("{id}")]
        public async Task<IActionResult> PutQuotes(int id, QuotesDTO quotesDTO)
        {
            if (id != quotesDTO.QuoteId)
            {
                return BadRequest();
            }

            _context.Entry(quotesDTO).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuotesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/

        // POST: api/Quotes
        [HttpPost]
        public async Task<ActionResult<QuotesDTO>> PostQuotes([FromBody] QuotesDTO quotesDTO)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            Quotes newQuote = new()                 
            {
                Content = quotesDTO.Content,
                Author = quotesDTO.Author,
                UserId = user.Id,
              
            };

            _context.QuoteSet.Add(newQuote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuotes", new { id = newQuote.QuoteId }, newQuote);
        }

        // DELETE: api/Quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuotes(int id)
        {
            var quote = await _context.QuoteSet.FindAsync(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.QuoteSet.Remove(quote);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuoteExists(int id)
        {
            return _context.QuoteSet.Any(e => e.QuoteId == id);
        }
    }
}
