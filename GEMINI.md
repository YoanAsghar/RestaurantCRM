# Guide: Real-time Synchronization with WebSockets (SignalR)

This guide outlines the steps for YOU to implement real-time synchronization. SignalR will allow your app to push updates to all users instantly via a single persistent connection, which is much more efficient than traditional HTTP polling.

## 1. Architectural Answer
**"Is total sync a good idea? Too many HTTP requests?"**
- **Efficiency:** SignalR uses WebSockets, keeping **one** connection open. No more "Are there updates?" requests.
- **Performance:** Data is only sent when something happens.
- **Necessity:** Essential for restaurant ops (Kitchen needs to know *now*, not in 30 seconds).

---

## 2. Backend Roadmap (SignalR)

### Task B1: Enhance the Hub
- **File:** `backend/Hubs/KitchenHub.cs`
- **Action:** Add methods that clients can call, or that the server can use to broadcast.
- **Example:**
  ```csharp
  public async Task UpdateTableStatus(Table table) => await Clients.All.SendAsync("ReceiveTableUpdate", table);
  ```

### Task B2: Trigger from Controllers
- **Files:** `TableController.cs`, `OrderController.cs`
- **Action:** 
  1. Use `IHubContext<KitchenHub>` (already injected in your code!).
  2. After `_context.SaveChangesAsync()`, call `_hubContext.Clients.All.SendAsync(...)` to notify everyone.

---

## 3. Frontend Roadmap (Next.js)

### Task F1: Create a SignalR Service
- **File:** `frontend/src/services/SignalRService.ts`
- **Action:** Write a class or set of functions to initialize `HubConnectionBuilder`, start the connection, and handle reconnections.

### Task F2: Implement a SignalR Provider/Context
- **File:** `frontend/src/app/GlobalContext.tsx` (or a new file)
- **Action:** 
  1. Wrap your app in a Context that holds the `hubConnection`.
  2. Start the connection when the user authenticates.

### Task F3: Listen for Updates in Pages
- **Files:** `MesasPage.tsx`, `CocinaPage.tsx`
- **Action:** 
  1. Use `useEffect` to subscribe to events (e.g., `connection.on("ReceiveTableUpdate", ...)`).
  2. Update your local React state (`setTables`, `setOrders`) using the data received from the hub.

---

## 4. Implementation Tips for Scalability
- **Surgical Updates:** Instead of fetching all tables again, just update the specific table in your state array.
- **Connection Lifecycle:** Ensure you stop the connection or unsubscribe from events when components unmount to prevent memory leaks.
- **Real IDs:** Ensure your frontend uses the database `id` instead of array indices so everyone is talking about the same table.
