using Microsoft.EntityFrameworkCore;
using ToDoApp.Models;

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        
        public DbSet<TodoItem> todoItems { get; set; }
    }
}