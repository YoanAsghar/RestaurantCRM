using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RestaurantCRM.Models
{
    [Table("orderDetails")]
    public class OrderDetail
    {
        public int Id { get; set; }
        [Required]
        public Product? ProductId { get; set; }
        [Required]
        public int Quantity { get; set; }
    }
}
