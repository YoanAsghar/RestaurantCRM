using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantCRM.Data;
using RestaurantCRM.Models;
using System.Security.Claims;
using BCrypt.Net;

namespace RestaurantCRM.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }


        //
        // GET FOR THE USERS
        //
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _context.Users
              .OrderBy(u => u.Id)
              .Select(u => new
              {
                  u.Id,
                  u.UserName,
                  u.Role
              })
              .ToListAsync();

            return Ok(users);
        }

        //
        // POST FOR THE USERS CREATION
        //
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User newUser)
        {

            //Verify that all data is correct
            if (string.IsNullOrWhiteSpace(newUser.UserName) || string.IsNullOrWhiteSpace(newUser.PasswordHash))
            {
                return BadRequest(new { message = "Username and password are required" });
            }

            // Verify if user exists
            var UserExists = await _context.Users.AnyAsync(u => u.UserName.ToLower() == newUser.UserName.ToLower());

            if (UserExists)
            {
                return Conflict(new { message = "Username already exists" });
            }

            newUser.Role = "user";
            newUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newUser.PasswordHash, workFactor: 12);

            try
            {
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();
                newUser.PasswordHash = "";
                return Ok(newUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        //
        // POST FOR THE LOGIN
        //
        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] User request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.UserName);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.PasswordHash, user.PasswordHash))
            {
                return Unauthorized("Invalid credentials");
            }

            var claims = new List<Claim>{
              new Claim(ClaimTypes.Name, user.UserName),
              new Claim(ClaimTypes.Role, user.Role)
            };

            var identity = new ClaimsIdentity(claims, "cookie");
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync("cookie", principal);

            return Ok(new { user.UserName, user.Role });
        }


        //
        // Editing user
        //
        [HttpPut("{id:int}")]
        public async Task<ActionResult<User>> EditUser(int id, User editerUserData)
        {
            var UserToEdit = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (UserToEdit == null)
            {
                return BadRequest($"User with id {id} not found");
            }

            UserToEdit.PaymentDate = editerUserData.PaymentDate;
            UserToEdit.Role = editerUserData.Role;
            UserToEdit.Salary = editerUserData.Salary;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(UserToEdit);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //
        // Deleting users
        //
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (userToDelete == null)
            {
                return NotFound($"User with id {id} doesn't exist");
            }

            try
            {
                _context.Users.Remove(userToDelete);
                await _context.SaveChangesAsync();
                return Ok(userToDelete);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }

}
