
using Microsoft.AspNetCore.Mvc;
using ApiDemo.Data;



namespace ApiDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserInputController : ControllerBase
    {
        private readonly ApiDemoDbContext _context;

        public UserInputController(ApiDemoDbContext context)
        {
            _context = context;
        }

        //GET: api/<UserInputController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var userInput = _context.Inputs.FirstOrDefault(userInput => userInput.Id == id);
            if (userInput != null)
            {
                return Ok(userInput);
            }
            else
            {
                return NotFound();
            }    
        }

        //GET api/<UserInputController>/5
        [HttpGet("{id}")]
        public IActionResult GetByTodoId(Guid id)
        {
            var userInput = _context.Inputs.Where(userInput => userInput.TodoId == id);
            if (userInput != null)
            {
                return Ok(userInput);
            }
            else
            {
                return NotFound();
            }    
        }

        //GET api/<UserInputController>/5
        [HttpGet("{id}")]
        public IActionResult GetByElementId(Guid id)
        {
            var userInput = _context.Inputs.Where(userInput => userInput.ElementId == id);
            if (userInput != null)
            {
                return Ok(userInput);
            }
            else
            {
                return NotFound();
            }    
        }
    }
}
