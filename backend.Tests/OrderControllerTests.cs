using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace backend.Tests;

public class OrderControllerTests : IDisposable
{
    private readonly HttpClient _client;
    private readonly TestingWebAppFactory _factory;

    public OrderControllerTests()
    {
        _factory = new TestingWebAppFactory();
        _client = _factory.CreateClient();
        // All Order/Product endpoints require authorization; log in as the seeded admin.
        _client.PostAsJsonAsync("/api/v1/User/login",
            new { userName = "admin", passwordHash = "admin123" }).GetAwaiter().GetResult();
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    private async Task<JsonElement> CreateProductAsync(string name, double price, string category = "Drinks")
    {
        var response = await _client.PostAsJsonAsync("/api/v1/Product",
            new { name, price, category, description = "test", image = "" });
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<JsonElement>();
    }

    private async Task<JsonElement> CreateOrderAsync(
        string orderDateIso, int productId, string paymentMethod = "CASH",
        int guests = 2, int quantity = 1, double totalPrice = 12.5)
    {
        var body = new
        {
            totalPrice,
            orderDate = orderDateIso,
            guests,
            tip = 0,
            PaymentMethod = paymentMethod,
            tableId = 1,
            orderDetail = new[]
            {
                new { id = 0, orderId = 0, productId, quantity }
            }
        };
        var response = await _client.PostAsJsonAsync("/api/v1/Order", body);
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<JsonElement>();
    }

    [Fact]
    public async Task CreateOrder_Valid_ReturnsOkAndPersists()
    {
        var product = await CreateProductAsync("Burger", 12.5);
        var created = await CreateOrderAsync(DateTime.UtcNow.ToString("o"), product.GetProperty("id").GetInt32());

        Assert.Equal(12.5, created.GetProperty("totalPrice").GetDouble());
        Assert.Equal(2, created.GetProperty("guests").GetInt32());

        var orders = await _client.GetFromJsonAsync<JsonElement[]>("/api/v1/Order");
        Assert.Single(orders!);
    }

    [Fact]
    public async Task CreateOrder_PaymentMethodIsSerializedAsString()
    {
        var product = await CreateProductAsync("Coffee", 3.0);
        var created = await CreateOrderAsync(DateTime.UtcNow.ToString("o"),
            product.GetProperty("id").GetInt32(), paymentMethod: "CARD");

        Assert.Equal("CARD", created.GetProperty("paymentMethod").GetString());
    }

    [Fact]
    public async Task GetOrders_DefaultDate_ReturnsOnlyOrdersFromToday()
    {
        var product = await CreateProductAsync("Pizza", 10);
        var pid = product.GetProperty("id").GetInt32();

        var today = DateTime.UtcNow;
        await CreateOrderAsync(today.ToString("o"), pid);
        await CreateOrderAsync(today.AddDays(1).ToString("o"), pid);

        var response = await _client.GetAsync("/api/v1/Order");
        var orders = await response.Content.ReadFromJsonAsync<JsonElement[]>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Single(orders!);
    }

    [Fact]
    public async Task GetOrders_WithSpecificDate_ReturnsOnlyThatDaysOrders()
    {
        var product = await CreateProductAsync("Salad", 8);
        var pid = product.GetProperty("id").GetInt32();

        var yesterday = DateTime.UtcNow.AddDays(-1);
        var today = DateTime.UtcNow;
        await CreateOrderAsync(yesterday.ToString("o"), pid);
        await CreateOrderAsync(today.ToString("o"), pid);

        var dateParam = DateOnly.FromDateTime(DateTime.UtcNow.AddDays(-1)).ToString("yyyy-MM-dd");
        var orders = await _client.GetFromJsonAsync<JsonElement[]>($"/api/v1/Order?date={dateParam}");

        Assert.Single(orders!);
    }

    [Fact]
    public async Task GetOrders_IncludesOrderDetailsAndProducts()
    {
        var product = await CreateProductAsync("Sushi", 15, category: "Food");
        var pid = product.GetProperty("id").GetInt32();
        await CreateOrderAsync(DateTime.UtcNow.ToString("o"), pid, quantity: 3);

        var orders = await _client.GetFromJsonAsync<JsonElement[]>("/api/v1/Order");
        var order = orders![0];

        Assert.True(order.TryGetProperty("orderDetail", out var details),
            "Order response must include orderDetail and products");

        var detail = details[0];
        Assert.Equal(pid, detail.GetProperty("productId").GetInt32());
        Assert.Equal(3, detail.GetProperty("quantity").GetInt32());
        Assert.Equal("Sushi", detail.GetProperty("product").GetProperty("name").GetString());
        Assert.Equal("Food", detail.GetProperty("product").GetProperty("category").GetString());
    }
}
