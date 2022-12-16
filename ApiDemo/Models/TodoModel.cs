using ApiDemo.Data;
using System.ComponentModel.DataAnnotations;

namespace ApiDemo.Models
{
    public class TodoModel
    {
        public Guid Id { get; set; }
        public string? TodoName { get; set; }
        [Required, MaxLength(50)]
        public string? Code { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedTime { get; set; }
    }
}
