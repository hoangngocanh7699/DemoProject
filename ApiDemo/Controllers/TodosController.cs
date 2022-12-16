using ApiDemo.Data;
using ApiDemo.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApiDemoDbContext _context;

        public TodoController(ApiDemoDbContext context)
        {
            _context = context;
        }
        // GET: api/<TodosController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var todoList= _context.Todos.ToList();
            return Ok(todoList);
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var todo = _context.Todos.SingleOrDefault(todo => todo.Id == id);
            if (todo != null) 
            {
                return Ok(todo);
            }
            else
            {
                return NotFound();
            }
        }

        // POST api/<TodosController>
        [HttpPost]
        public IActionResult Create(TodoModel model)
        {
            try
            {
                var todo = new Todo
                {
                    Id = Guid.NewGuid(),
                    TodoName = model.TodoName,
                    Code = model.Code,
                    CreatedDate = DateTime.Now,
                    LastUpdatedTime = DateTime.Now,
                };
                _context.Add(todo);
                _context.SaveChanges();
                return Ok(todo);
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT api/<TodosController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateById(Guid id, TodoModel model)
        {
            var todo = _context.Todos.SingleOrDefault(todo => todo.Id == id);
            if (todo != null)
            {
                todo.TodoName = model.TodoName;
                todo.Code = model.Code;
                todo.LastUpdatedTime = DateTime.Now;
                _context.SaveChanges();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE api/<TodosController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var todo = _context.Todos.SingleOrDefault(todo => todo.Id == id);
            if (todo != null)
            {
                _context.Remove(todo);
                _context.SaveChanges();
                return NoContent();
            }else
            {
                return NotFound();
            }
            return Ok();
        }
    }
}
