namespace RestaurantCRM.Models
{
    public enum Roles
    {
        User = 0,
        Admin = 1
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public Roles Rol { get; set; }
    }
}
