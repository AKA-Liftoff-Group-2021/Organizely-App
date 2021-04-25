using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]
    public class QuotesController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public QuotesController(StudentDbContext context)
        {
            _context = context;
        }

        // GET: api/Quotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuotesDTO>>> GetQuotes()
        {
            var quotes = await _context.Quotes.Select(q =>
            new QuotesDTO()
            {
                QuoteId = q.QuoteId,
                Content = q.Content,
                Author = q.Author,

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
            var quotes = await _context.Quotes.Select(q =>
            new QuotesDTO()
            {
                QuoteId = q.QuoteId,
                Content = q.Content,
                Author = q.Author,

            }).SingleOrDefaultAsync(a => a.QuoteId == id);

            if (quotes == null)
            {
                return NotFound("Quote Id does not exist");
            }

            return quotes;
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
        public async Task<ActionResult<QuotesDTO>> PostQuotes(QuotesDTO quotesDTO)
        {
            Quotes newQuote = new Quotes
            {
                Content = quotesDTO.Content,
                Author = quotesDTO.Author,
              
            };

            _context.Quotes.Add(newQuote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuotes", new { id = quotesDTO.QuoteId }, quotesDTO);
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
