using ApiDemo.Data;
using System.ComponentModel.DataAnnotations;

namespace ApiDemo.Models
{
    public class CategoryModel
    {
        public Guid TodoId { get; set; }
        public Guid? ParentId { get; set; }
        public string? CategoryName { get; set; }
        [Required, MaxLength(50)]
        public string? Code { get; set; }
    }
}