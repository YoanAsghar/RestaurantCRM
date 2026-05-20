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
    // GET FOR THE ORDERS BY ID PAGE AND SIZE
    //
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders([FromQuery] DateOnly? date)
    {
        var filterDate = date ?? DateOnly.FromDateTime(DateTime.UtcNow);

        var startDay = filterDate.ToDateTime(TimeOnly.MinValue, DateTimeKind.Utc);
        var endDay = startDay.AddDays(1);

        var orders = await _context.Orders
                  .Where(o => o.OrderDate >= startDay && o.OrderDate < endDay)
                  .AsNoTracking()
                  .Include(o => o.OrderDetail)
                  .ThenInclude(od => od.Product)
                  .Select(o => new Order
                  {
                      Id = o.Id,
                      TotalPrice = o.TotalPrice,
                      OrderDate = o.OrderDate,
                      Guests = o.Guests,
                      Tip = o.Tip,
                      PaymentMethod = o.PaymentMethod,
                      TableId = o.TableId,
                      OrderDetail = o.OrderDetail.Select(od => new OrderDetail
                      {
                          Id = od.Id,
                          OrderId = od.OrderId,
                          ProductId = od.ProductId,
                          Product = new Product
                          {
                              Id = od.Product!.Id,
                              Name = od.Product.Name,
                              Price = od.Product.Price,
                              Category = od.Product.Category,
                              Description = od.Product.Description,
                              Image = null
                          },
                          Quantity = od.Quantity
                      }).ToList()
                  })
                  .OrderByDescending(o => o.Id)
                  .ToListAsync();

        return Ok(orders);
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
