
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiDemo.Data
{
    public class UserInput
    {
        [Key]
        public Guid Id { get; set; }
        public Guid TodoId { get; set; }
        public Guid ElementId { get; set; }


        [ForeignKey("TodoId")]
        public Todo Todo { get; set; }
    }
}
