import { Clock, DollarSign, Users, CreditCard, Banknote } from "lucide-react";

const colorPalette = {
  DeepTwilight: "#140152",
  Navy: "#22007c",
  Charcoal: "#121212",
  White: "#f4f4f8"
};

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: "pending" | "preparing" | "ready" | "completed";
  total: number;
  date: string;
  time: string;
  paymentMethod?: "cash" | "card" | "transfer";
  guests: number;
}

export const OrdersContent = () => {
  const orders: Order[] = [
    {
      id: "ORD-001",
      tableId: "Mesa 01",
      items: [
        { name: "Hamburguesa Premium", quantity: 2, price: 15.00 },
        { name: "Papas Fritas", quantity: 2, price: 5.00 },
        { name: "Coca Cola", quantity: 2, price: 3.50 },
      ],
      status: "completed",
      total: 47.00,
      date: "11/04/2026",
      time: "12:30",
      paymentMethod: "card",
      guests: 2
    },
    {
      id: "ORD-002",
      tableId: "Mesa 03",
      items: [
        { name: "Pizza Margarita", quantity: 1, price: 14.00 },
        { name: "Pasta Carbonara", quantity: 2, price: 13.50 },
        { name: "Ensalada César", quantity: 1, price: 8.00 },
        { name: "Jugo Natural", quantity: 3, price: 4.00 },
      ],
      status: "ready",
      total: 57.00,
      date: "11/04/2026",
      time: "13:15",
      guests: 3
    },
    {
      id: "ORD-003",
      tableId: "Mesa 05",
      items: [
        { name: "Hamburguesa Clásica", quantity: 4, price: 12.50 },
        { name: "Papas Fritas", quantity: 3, price: 5.00 },
        { name: "Coca Cola", quantity: 4, price: 3.50 },
      ],
      status: "preparing",
      total: 79.00,
      date: "11/04/2026",
      time: "13:45",
      guests: 4
    },
    {
      id: "ORD-004",
      tableId: "Mesa 02",
      items: [
        { name: "Ensalada César", quantity: 2, price: 8.00 },
        { name: "Agua Mineral", quantity: 2, price: 2.50 },
      ],
      status: "pending",
      total: 21.00,
      date: "11/04/2026",
      time: "14:00",
      guests: 2
    },
    {
      id: "ORD-005",
      tableId: "Mesa 07",
      items: [
        { name: "Pizza Margarita", quantity: 2, price: 14.00 },
        { name: "Hamburguesa Premium", quantity: 1, price: 15.00 },
        { name: "Papas Fritas", quantity: 3, price: 5.00 },
        { name: "Coca Cola", quantity: 5, price: 3.50 },
      ],
      status: "ready",
      total: 75.50,
      date: "11/04/2026",
      time: "14:20",
      guests: 5
    },
    {
      id: "ORD-006",
      tableId: "Mesa 01",
      items: [
        { name: "Pasta Carbonara", quantity: 1, price: 13.50 },
        { name: "Ensalada César", quantity: 1, price: 8.00 },
        { name: "Jugo Natural", quantity: 2, price: 4.00 },
      ],
      status: "completed",
      total: 29.50,
      date: "11/04/2026",
      time: "11:00",
      paymentMethod: "cash",
      guests: 2
    },
    {
      id: "ORD-007",
      tableId: "Mesa 09",
      items: [
        { name: "Hamburguesa Clásica", quantity: 3, price: 12.50 },
        { name: "Coca Cola", quantity: 3, price: 3.50 },
      ],
      status: "preparing",
      total: 48.00,
      date: "11/04/2026",
      time: "14:35",
      guests: 3
    },
    {
      id: "ORD-008",
      tableId: "Mesa 03",
      items: [
        { name: "Pizza Margarita", quantity: 3, price: 14.00 },
        { name: "Papas Fritas", quantity: 4, price: 5.00 },
        { name: "Agua Mineral", quantity: 6, price: 2.50 },
      ],
      status: "completed",
      total: 77.00,
      date: "11/04/2026",
      time: "10:30",
      paymentMethod: "transfer",
      guests: 6
    },
  ];

  const getPaymentIcon = (method?: Order["paymentMethod"]) => {
    if (!method) return null;

    switch (method) {
      case "cash":
        return <DollarSign className="w-4 h-4" />;
      case "card":
        return <CreditCard className="w-4 h-4" />;
      case "transfer":
        return <Banknote className="w-4 h-4" />;
    }
  };

  const getPaymentLabel = (method?: Order["paymentMethod"]) => {
    if (!method) return "-";

    switch (method) {
      case "cash":
        return "Efectivo";
      case "card":
        return "Tarjeta";
      case "transfer":
        return "Transferencia";
    }
  };

  return (
    <div
      className="h-screen w-full overflow-auto"
      style={{ backgroundColor: colorPalette.DeepTwilight }}
    >
      {/* Table Container */}
      <div className="p-8">
        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: colorPalette.Charcoal }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    backgroundColor: colorPalette.Navy,
                    borderColor: colorPalette.DeepTwilight
                  }}
                >
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    ID Orden
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Mesa
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Comensales
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Items
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Fecha/Hora
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Pago
                  </th>
                  <th
                    className="text-right py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  return (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-opacity-50 transition-colors"
                      style={{
                        borderColor: `${colorPalette.Navy}60`,
                        backgroundColor: index % 2 === 0 ? "transparent" : `${colorPalette.Navy}20`
                      }}
                    >
                      {/* ID */}
                      <td
                        className="py-5 px-6 font-mono text-sm font-semibold"
                        style={{ color: colorPalette.White }}
                      >
                        {order.id}
                      </td>

                      {/* Mesa */}
                      <td
                        className="py-5 px-6 text-sm font-medium"
                        style={{ color: colorPalette.White }}
                      >
                        {order.tableId}
                      </td>

                      {/* Comensales */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Users
                            className="w-4 h-4"
                            style={{ color: colorPalette.White, opacity: 0.7 }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: colorPalette.White }}
                          >
                            {order.guests}
                          </span>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-5 px-6">
                        <div className="space-y-1 max-w-xs">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="text-xs"
                              style={{ color: colorPalette.White, opacity: 0.85 }}
                            >
                              {item.quantity}x {item.name}
                              <span className="ml-2 opacity-60">
                                (${(item.quantity * item.price).toFixed(2)})
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Fecha/Hora */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Clock
                            className="w-4 h-4"
                            style={{ color: colorPalette.White, opacity: 0.5 }}
                          />
                          <div>
                            <div
                              className="text-xs"
                              style={{ color: colorPalette.White }}
                            >
                              {order.date}
                            </div>
                            <div
                              className="text-xs opacity-60"
                              style={{ color: colorPalette.White }}
                            >
                              {order.time}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Método de Pago */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          {order.paymentMethod ? (
                            <>
                              <div
                                style={{ color: colorPalette.White, opacity: 0.7 }}
                              >
                                {getPaymentIcon(order.paymentMethod)}
                              </div>
                              <span
                                className="text-sm"
                                style={{ color: colorPalette.White }}
                              >
                                {getPaymentLabel(order.paymentMethod)}
                              </span>
                            </>
                          ) : (
                            <span
                              className="text-sm opacity-50"
                              style={{ color: colorPalette.White }}
                            >
                              Pendiente
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Total */}
                      <td
                        className="py-5 px-6 text-right font-bold text-base"
                        style={{ color: colorPalette.White }}
                      >
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr
                  className="border-t-2"
                  style={{
                    backgroundColor: colorPalette.Navy,
                    borderColor: colorPalette.DeepTwilight
                  }}
                >
                  <td
                    colSpan={6}
                    className="py-4 px-6 text-base font-bold text-right"
                    style={{ color: colorPalette.White }}
                  >
                    TOTAL GENERAL
                  </td>
                  <td
                    className="py-4 px-6 text-right font-bold text-xl"
                    style={{ color: colorPalette.White }}
                  >
                    ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Estadísticas Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: colorPalette.Charcoal }}
          >
            <p
              className="text-xs opacity-70 mb-2"
              style={{ color: colorPalette.White }}
            >
              Total Órdenes
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: colorPalette.White }}
            >
              {orders.length}
            </p>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: colorPalette.Charcoal }}
          >
            <p
              className="text-xs opacity-70 mb-2"
              style={{ color: colorPalette.White }}
            >
              Completadas
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: "#22c55e" }}
            >
              {orders.filter(o => o.status === "completed").length}
            </p>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: colorPalette.Charcoal }}
          >
            <p
              className="text-xs opacity-70 mb-2"
              style={{ color: colorPalette.White }}
            >
              En Proceso
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: "#f59e0b" }}
            >
              {orders.filter(o => o.status === "preparing" || o.status === "ready").length}
            </p>
          </div>

          <div
            className="p-6 rounded-xl"
            style={{ backgroundColor: colorPalette.Charcoal }}
          >
            <p
              className="text-xs opacity-70 mb-2"
              style={{ color: colorPalette.White }}
            >
              Pendientes
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: "#ef4444" }}
            >
              {orders.filter(o => o.status === "pending").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
