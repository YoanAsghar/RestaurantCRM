using Microsoft.AspNetCore.Mvc;
using RestaurantCRM.Models;
using RestaurantCRM.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using RestaurantCRM.Hubs;

namespace RestaurantCRM.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
public class TableController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHubContext<TablesHub> _hubContext;

    public TableController(ApplicationDbContext context, IHubContext<TablesHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
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
        var TableToDelete = _context.Tables
          .OrderBy(t => t.Id)
          .Last();
        _context.Tables.Remove(TableToDelete);

        try
        {
            await _context.SaveChangesAsync();
            return Ok(TableToDelete);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error deleting table {ex}");
        }
    }
}
