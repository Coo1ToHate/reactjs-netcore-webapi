using Microsoft.EntityFrameworkCore;
using WebApplicationLibrary.Models;

namespace WebApplicationLibrary.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Book> Books { get; set; }
    }
}
