using ApiDemo.Data;
using ApiDemo.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiDemo.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ElementController : ControllerBase
    {
        private readonly ApiDemoDbContext _context;

        public ElementController(ApiDemoDbContext context)
        {
            _context = context;
        }

        //GET: api/<ElementsController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var elementList= _context.Elements.ToList();
            return Ok(elementList);
        }

        //GET api/<ElementsController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var element = _context.Elements.SingleOrDefault(element => element.Id == id);
            if (element != null)
            {
                return Ok(element);
            }
            else
            {
                return NotFound();
            }
        }

        //GET api/<ElementController>/5
        [HttpGet("{id}")]
        public IActionResult GetByTodoId(Guid id)
        {
            var element = _context.Elements.Where(element => element.TodoId == id);
            if (element != null)
            {
                return Ok(element);
            }
            else
            {
                return NotFound();
            }
        }


        //POST api/<ElementsController>
        [HttpPost]
        public IActionResult Create(ElementModel model)
        {
            try
            {
                var element = new Element
                {
                    Id = Guid.NewGuid(),
                    TodoId = model.TodoId,
                    ParentId = model.ParentId,
                    ElementName = model.ElementName,
                    ElementDescription = model.Description,
                    DueDate = model.DueDate,
                    CreatedDate = DateTime.Now,
                    LastUpdatedTime = DateTime.Now,
                };
                _context.Add(element);
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        //PUT api/<ElementsController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateById(Guid id, ElementModel model)
        {
            var element = _context.Elements.SingleOrDefault(element => element.Id == id);
            if (element != null)
            {
                element.ElementName = model.ElementName;
                element.LastUpdatedTime = DateTime.Now;
                _context.SaveChanges();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        //DELETE api/<ElementsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var element = _context.Elements.SingleOrDefault(element => element.Id == id);
            if (element != null)
            {
                _context.Remove(element);
                _context.SaveChanges();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
            return Ok();
        }
    }
}