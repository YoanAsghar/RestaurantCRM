using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Mvc;
using RestaurantCRM.Models;

namespace RestaurantCRM.Hubs
{
    public class RestaurantHub : Hub
    {
        public async Task SendOrderToKitchen(Order order)
        {
            await Clients.All.SendAsync("SendOrderToKichen", order);
        }
    }
}
