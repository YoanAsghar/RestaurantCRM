using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantCRM.Models
{
    [Table("tables")]
    public class Table
    {
        public int Id { get; set; }
        public List<Product> Products { get; set; } = new();
        bool IsActive { get; set; } = false;
    }
}
