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
        public int? TableId { get; set; }
        [ForeignKey("TableId")]
        public Table? Table { get; set; }

        public int? OrderDetailId { get; set; }
        [ForeignKey("OrderDetailId")]
        public OrderDetail? OrderDetail { get; set; }
    }
}
