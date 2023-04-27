using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoApp.Models;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly DataContext _context;
        
        public ToDoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTask(int id)
        {
            var todo = await _context.todoItems.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetAllTasks()
        {
            return await _context.todoItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> Post(TodoItem item)
        {
            _context.todoItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTask), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TodoItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todo = await _context.todoItems.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            _context.todoItems.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoItemExists(int id)
        {
            return _context.todoItems.Any(e => e.Id == id);
        }
    }
}
