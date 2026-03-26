namespace RestaurantCRM.Models
{
    public enum OrderStatus
    {
        Created = 0,
        Completed = 1,
        Canceled = 2
    }
    public class Order
    {
        public int Id { get; set; }
        public float TotalPrice { get; set; }
        public OrderStatus OrderStatus { get; set; } = 0;
        public DateTime OrderDate { get; set; } = DateTime.Now;

        //Foreign keys
        public Table? Table { get; set; }
        public OrderDetail? OrderDetail { get; set; }
    }
}
