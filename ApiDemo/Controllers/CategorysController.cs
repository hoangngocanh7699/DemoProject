using ApiDemo.Data;
using ApiDemo.Models;
using Microsoft.AspNetCore.Mvc;

namespace ApiDemo.Controllers
{
[Route("api/[controller]/[action]")]
[ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ApiDemoDbContext _context;

        public CategoryController(ApiDemoDbContext context)
        {
            _context = context;
        }
        // GET: api/<CategorysController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var categoryList= _context.Categories.ToList();
            return Ok(categoryList);
        }

        //GET api/<CategorysController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var category = _context.Categories.SingleOrDefault(category => category.Id == id);
            if (category != null)
            {
                return Ok(category);
            }
            else
            {
                return NotFound();
            }
        }

        //GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public IActionResult GetByTodoId(Guid id)
        {
            var category = _context.Categories.Where(category => category.TodoId == id);
            if (category != null)
            {
                return Ok(category);
            }
            else
            {
                return NotFound();
            }
        }

        //POST api/<CategorysController>
        [HttpPost]
        public IActionResult Create(CategoryModel model)
        {
            try
            {
                var category = new Category 
                {
                    Id = Guid.NewGuid(),
                    TodoId = model.TodoId,
                    ParentId = model.ParentId,
                    CategoryName = model.CategoryName,
                    Code = model.Code,
                    CreatedDate = DateTime.Now,
                    LastUpdatedTime = DateTime.Now,
                };
                _context.Add(category);
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        //PUT api/<CategorysController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateById(Guid id, CategoryModel model)
        {
            var category = _context.Categories.SingleOrDefault(category => category.Id == id);
            if (category != null)
            {
                category.CategoryName = model.CategoryName;
                category.Code = model.Code;
                category.LastUpdatedTime = DateTime.Now;
                _context.SaveChanges();
                return NoContent();
            }
            else
            {
                return NotFound();
            }
        }

        //DELETE api/<CategorysController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var category = _context.Categories.SingleOrDefault(category => category.Id == id);
            if (category != null)
            {
                _context.Remove(category);
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