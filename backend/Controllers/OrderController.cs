using Microsoft.AspNetCore.Mvc;
using RestaurantCRM.Models;

namespace RestaurantCRM.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    //
    // GET FOR THE ORDERS
    //
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetTables()
    {

        return Ok();
    }

    //
    // POST FOR THE ORDERS
    //
    [HttpPost]
    public async Task<ActionResult> CreateTable()
    {
        return Ok();
    }

    //
    // PUT FOR THE ORDERS
    //
}
