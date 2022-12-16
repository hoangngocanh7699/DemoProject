using ApiDemo.Data;
using System.ComponentModel.DataAnnotations;

namespace ApiDemo.Models
{
    public class ElementModel
    {
        public Guid Id { get; set; }
        public Guid TodoId { get; set; }
        public Guid ParentId { get; set; }
        public string? ElementName { get; set; }
        [Required, MaxLength(50)]
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedTime { get; set; }
    }
}