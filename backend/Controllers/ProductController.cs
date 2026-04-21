using Microsoft.AspNetCore.Mvc;
using RestaurantCRM.Models;

namespace RestaurantCRM.Controllers;

[Route("/api/v1/[controller]")]
[ApiController]

public class ProductController : ControllerBase
{
    //
    // GET FOR THE PRODUCTS
    //
    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
        return Ok();
    }
    //
    // POST FOR THE PRODUCTS
    //
    [HttpPost]
    public async Task<ActionResult<List<Product>>> CreateProduct()
    {
        return Ok();
    }
    //
    // PUT FOR THE PRODUCTS
    //
    [HttpPut]
    public async Task<ActionResult<List<Product>>> EditProduct()
    {
        return Ok();
    }
    //
    // DELETE FOR THE PRODUCTS
    //
    [HttpDelete]
    public async Task<ActionResult<List<Product>>> DeleteProduct()
    {
        return Ok();
    }
}
