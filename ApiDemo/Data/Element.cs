using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApiDemo.Data
{
    [Table("Element")]
    public class Element
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TodoId { get; set; }
        public Guid ParentId { get; set; }

        [Required, MaxLength(100)]
        public string? ElementName { get; set; }
        [MaxLength(100)]
        public string? ElementDescription { get; set; }
        [Column(TypeName = "date")]
        public DateTime? DueDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastUpdatedTime { get; set; }

        [ForeignKey("TodoId")]
        public Todo Todo { get; set; }
    }
}
