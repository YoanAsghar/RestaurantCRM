using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantCRM.Models;
using RestaurantCRM.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;
using RestaurantCRM.Hubs;

namespace RestaurantCRM.Controllers;

[Route("api/v1/[controller]")]
[ApiController]
[Authorize]
public class TableController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IHubContext<RestaurantHub> _hubContext;

    public TableController(ApplicationDbContext context, IHubContext<RestaurantHub> hubContext)
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
        if (table.TableNumber == null)
        {
            return BadRequest("Table number is required");
        }

        _context.Tables.Add(table);
        await _context.SaveChangesAsync();
        return Ok(table);
    }

    //
    // DELETE FOR THE TABLES
    //
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteTable(int id)
    {
        var tableToDelete = await _context.Tables.FirstOrDefaultAsync(t => t.Id == id);
        if (tableToDelete == null)
        {
            return NotFound($"Table with id {id} doesn't exist");
        }

        _context.Tables.Remove(tableToDelete);

        try
        {
            await _context.SaveChangesAsync();
            return Ok(tableToDelete);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error deleting table {ex}");
        }
    }
}
