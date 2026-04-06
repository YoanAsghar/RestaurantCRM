using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestaurantCRM.Models
{
    public enum Roles
    {
        User = 0,
        Admin = 1
    }

    [Table("users")]
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; } = string.Empty;
        [Required, MinLength(10)]
        public string PasswordHash { get; set; } = string.Empty;
        [Required]
        public Roles Rol { get; set; }
    }
}
