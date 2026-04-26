using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantCRM.Models
{
    public enum PaymentMethod
    {
        CASH,
        CARD,
        BANK_TRANS
    }
    [Table("orders")]
    public class Order
    {
        public int Id { get; set; }
        public float TotalPrice { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public int Guests { get; set; }
        public int Tip { get; set; }
        public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.CASH;
        [ForeignKey("TableId")]
        public int? TableId { get; set; }
        [ForeignKey("OrderDetailId")]
        public ICollection<OrderDetail> OrderDetail { get; set; }
    }
}
