using RestaurantCRM.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

var myAllowedSpecifiedOrigins = "_myAllowedSpecifiedOrigins";
// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myAllowedSpecifiedOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
    });

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration
      .GetConnectionString("DefaultConnection"))
    );

builder.Services.AddAuthentication("cookie")
  .AddCookie("cookie", options =>
  {
      options.Cookie.Name = "AuthorizationCookies";
      options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
      options.Cookie.HttpOnly = true;
      options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

      options.Events = new CookieAuthenticationEvents
      {
          OnRedirectToLogin = context =>
          {
              context.Response.StatusCode = 401;
              return Task.CompletedTask;
          },
          OnRedirectToAccessDenied = context =>
          {
              context.Response.StatusCode = 403;
              return Task.CompletedTask;
          }
      };
  });

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(myAllowedSpecifiedOrigins);

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<RestaurantCRM.Hubs.OrdersHub>("/ordersHub");

app.Run();
