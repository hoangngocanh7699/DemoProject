using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiDemo.Data
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TodoId { get; set; }
        public Guid? ParentId { get; set; }

        [Required, MaxLength(100)]
        public string? CategoryName { get; set; }
        [Required, MaxLength(50)]
        public string? Code { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        [ForeignKey("TodoId")]
        public Todo Todo { get; set; }
    }
}
