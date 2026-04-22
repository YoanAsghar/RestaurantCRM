using Microsoft.AspNetCore.Mvc;
using RestaurantCRM.Models;
using Microsoft.EntityFrameworkCore;
using RestaurantCRM.Data;

namespace RestaurantCRM.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    // database context
    private readonly ApplicationDbContext _context;
    public OrderController(ApplicationDbContext context)
    {
        _context = context;
    }
    //
    // GET FOR THE ORDERS
    //
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders([FromQuery] int pageSize, [FromQuery] int page)
    {
        var tableList = _context.Orders
          .OrderByDescending(o => o.Id)
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .ToList();
        return Ok(tableList);
    }

    //
    // POST FOR THE ORDERS
    //
    [HttpPost]
    public async Task<ActionResult> CreateOrder(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return Ok(order);
    }

    //
    // PUT FOR THE ORDERS
    //
}
