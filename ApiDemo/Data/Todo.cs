using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiDemo.Data
{
    [Table("Todo")]
    public class Todo
    {
        [Key]
        public Guid Id { get; set; }
        [Required, MaxLength(100)]
        public string? TodoName { get; set; }
        [Required, MaxLength(50)]
        public string? Code { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Element> Elements { get; set; }
    }
}
