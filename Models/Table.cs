namespace RestaurantCRM.Models
{
    public class Table
    {
        public int Id { get; set; }
        public List<Product> Products { get; set; } = new();
        bool IsActive { get; set; } = false;
    }
}
