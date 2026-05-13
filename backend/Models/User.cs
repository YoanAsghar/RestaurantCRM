using System.Security.Claims;

namespace RestaurantCRM.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public float Salary { get; set; }
        public DateOnly PaymentDate { get; set; }
    }
}
