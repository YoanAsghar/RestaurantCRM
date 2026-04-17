using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantCRM.Models
{
    [Table("orders")]
    public class Order
    {
        public int Id { get; set; }
        public float TotalPrice { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public int Guests { get; set; }

        //Foreign keys
        public Table? TableId { get; set; }
        public OrderDetail? OrderDetail { get; set; }
    }
}
