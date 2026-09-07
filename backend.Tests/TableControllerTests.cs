using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace backend.Tests;

public class TableControllerTests : IDisposable
{
    private readonly HttpClient _client;
    private readonly TestingWebAppFactory _factory;

    public TableControllerTests()
    {
        _factory = new TestingWebAppFactory();
        _client = _factory.CreateClient();
        // All Table endpoints require authorization; log in as the seeded admin.
        _client.PostAsJsonAsync("/api/v1/User/login",
            new { userName = "admin", passwordHash = "admin123" }).GetAwaiter().GetResult();
    }

    public void Dispose()
    {
        _client.Dispose();
        _factory.Dispose();
    }

    private async Task<JsonElement> CreateTableAsync(int tableNumber)
    {
        var response = await _client.PostAsJsonAsync("/api/v1/Table", new { tableNumber });
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<JsonElement>();
    }

    [Fact]
    public async Task GetTables_EmptyDatabase_ReturnsEmptyList()
    {
        var response = await _client.GetAsync("/api/v1/Table");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        var tables = await response.Content.ReadFromJsonAsync<JsonElement[]>();
        Assert.Empty(tables);
    }

    [Fact]
    public async Task GetTables_ReturnsPersistedTablesWithRealIds()
    {
        await CreateTableAsync(1);
        await CreateTableAsync(2);

        var response = await _client.GetAsync("/api/v1/Table");
        var tables = await response.Content.ReadFromJsonAsync<JsonElement[]>();

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal(2, tables!.Length);

        // Ids must be the real DB-assigned ids (1-based, but crucially NOT a
        // frontend remap like index+1); each id must be unique and present.
        var ids = tables.Select(t => t.GetProperty("id").GetInt32()).Distinct();
        Assert.Equal(2, ids.Count());
        Assert.All(ids, id => Assert.True(id > 0));
    }

    [Fact]
    public async Task CreateTable_ValidTableNumber_ReturnsOkAndPersists()
    {
        var created = await CreateTableAsync(7);

        Assert.Equal(7, created.GetProperty("tableNumber").GetInt32());

        var tables = await _client.GetFromJsonAsync<JsonElement[]>("/api/v1/Table");
        Assert.Single(tables!);
        Assert.Equal(7, tables[0].GetProperty("tableNumber").GetInt32());
    }

    [Fact]
    public async Task CreateTable_MissingTableNumber_ReturnsBadRequest()
    {
        var response = await _client.PostAsJsonAsync("/api/v1/Table", new { });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task DeleteTable_ExistingId_RemovesOnlyThatTable()
    {
        var first = await CreateTableAsync(1);
        var second = await CreateTableAsync(2);
        var firstId = first.GetProperty("id").GetInt32();

        var response = await _client.DeleteAsync($"/api/v1/Table/{firstId}");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var tables = await _client.GetFromJsonAsync<JsonElement[]>("/api/v1/Table");
        var remainingIds = tables!.Select(t => t.GetProperty("id").GetInt32()).ToArray();

        // Deleting by id must remove ONLY the targeted table, never a 'last' table.
        Assert.DoesNotContain(firstId, remainingIds);
        Assert.Contains(second.GetProperty("id").GetInt32(), remainingIds);
        Assert.Equal(1, remainingIds.Length);
    }

    [Fact]
    public async Task DeleteTable_MissingId_ReturnsNotFound()
    {
        var response = await _client.DeleteAsync("/api/v1/Table/999999");

        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    [Fact]
    public async Task DeleteTable_MissingId_DoesNotDeleteAnything()
    {
        await CreateTableAsync(1);

        var response = await _client.DeleteAsync("/api/v1/Table/999999");

        var tables = await _client.GetFromJsonAsync<JsonElement[]>("/api/v1/Table");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Single(tables!);
    }
}
