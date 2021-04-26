using System;
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
        public async Task<ActionResult<IEnumerable<QuotesDTO>>> GetQuote() //s
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var quotes = await _context.Quotes.Where(u => u.UserId == user.Id).Include(u => u.User).Select(q =>
            
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
            var quotes = await _context.Quotes.Where(u => u.UserId == user.Id).Include(u => u.User).Select(q => 
                new QuotesDTO()
                {
                    QuoteId = q.QuoteId,
                    Content = q.Content,
                    Author = q.Author,
                    UserId = q.UserId,

                }).SingleOrDefaultAsync(q => q.QuoteId == id);

            if (quotes == null)
            {
                return NotFound();
            }

            return Ok(quotes);
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
            QuoteSet newQuote = new()
            {
                Content = quotesDTO.Content,
                Author = quotesDTO.Author,
                UserId = user.Id,
              
            };

            _context.Quotes.Add(newQuote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuotes", new { id = newQuote.QuoteId }, newQuote);
        }

        // DELETE: api/Quotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuotes(int id)
        {
            var quotes = await _context.Quotes.FindAsync(id);
            if (quotes == null)
            {
                return NotFound();
            }

            _context.Quotes.Remove(quotes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuotesExists(int id)
        {
            return _context.Quotes.Any(e => e.QuoteId == id);
        }
    }
}
