using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantCRM.Models
{
    [Table("tables")]
    public class Table
    {
        public int Id { get; set; }
    }
}
