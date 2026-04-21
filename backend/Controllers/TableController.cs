using Microsoft.AspNetCore.Mvc;
using RestaurantCRM.Models;
using RestaurantCRM.Data;
using Microsoft.EntityFrameworkCore;

namespace RestaurantCRM.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class TableController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TableController(ApplicationDbContext context)
    {
        _context = context;
    }
    //
    // GET FOR THE ORDERS
    //
    [HttpGet]
    public async Task<ActionResult<List<Table>>> GetTables()
    {
        return Ok(await _context.Tables.ToListAsync());
    }

    //
    // POST FOR THE ORDERS
    //
    [HttpPost]
    public async Task<ActionResult> CreateTable(Table table)
    {
        _context.Tables.Add(table);
        await _context.SaveChangesAsync();
        return Ok(table);
    }

    //
    // DELETE FOR THE ORDERS 
    //
    [HttpDelete]
    public async Task<ActionResult> DeleteTable()
    {
        return Ok();
    }
}
