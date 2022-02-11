using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationLibrary.Data;
using WebApplicationLibrary.Models;

namespace WebApplicationLibrary.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibraryController : ControllerBase
    {
        private readonly DataContext _context;

        public LibraryController(DataContext context)
        {
            _context = context;
            if (!context.Books.Any())
            {
                context.Add(new Book { Author = "Прайс Марк", Genre = "Учебная литература", Name = "C# 9 и .NET 5. Разработка и оптимизация", Year = 2022 });
                context.Add(new Book { Author = "Carl Rippon", Genre = "Учебная литература", Name = "ASP.NET Core 3 and React", Year = 2019 });
                context.Add(new Book { Author = "Дэн Браун", Genre = "Роман", Name = "Ангелы и демоны", Year = 2000 });
                context.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<IEnumerable<Book>> Get()
        {
            return await _context.Books.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Book book)
        {
            if (book == null)
            {
                return BadRequest("Bad Request");
            }
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return Ok("Added Successfully");
        }

        [HttpPut]
        public async Task<IActionResult> Put(Book book)
        {
            if (book == null)
            {
                return BadRequest("Bad Request");
            }

            if (!_context.Books.Any(x => x.Id == book.Id))
            {
                return NotFound("NotFound");
            }
            _context.Entry(book).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok("Update Successfully");
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return BadRequest("Bad Request");
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok("Deleted Successfully");
        }
    }
}
