namespace RestaurantCRM.Models
{
    // Wire shape for tables: the DB entity plus the table's current OPEN order
    // (if any) so the Mesas page initializes from real shared state.
    public class TableResponseDto
    {
        public int Id { get; set; }
        public int? TableNumber { get; set; }
        public Order? Order { get; set; }
    }
}