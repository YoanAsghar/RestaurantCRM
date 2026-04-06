using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantCRM.Models
{
    [Table("products")]
    public class Product
    {
        public int Id { get; set; }
        [Required]
        public double Price { get; set; }
        public int Stock { get; set; }
        public string ImageReference { get; set; } = string.Empty;
    }
}
