import { Users, Clock } from "lucide-react";
import { Order } from "../../models/order";
import { useEffect, useState } from "react";
import { OrderServices } from "../../services/OrderServices";

const colorPalette = {
  DeepTwilight: "#140152",
  Navy: "#22007c",
  Charcoal: "#121212",
  White: "#f4f4f8"
};

export const OrdersContent = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    OrderServices.getAll(page).then(setOrders);
  }, []);

  const totalGeneral = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div
      className="h-screen w-full overflow-auto"
      style={{ backgroundColor: colorPalette.DeepTwilight }}
    >
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
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>ID Orden</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Mesa</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Comensales</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Items</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Fecha/Hora</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Pago</th>
                  <th className="text-right py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const fecha = new Date(order.date);
                  return (
                    <tr
                      key={order.id}
                      className="border-b hover:bg-opacity-50 transition-colors"
                      style={{ borderColor: `${colorPalette.Navy}60` }}
                    >
                      {/* ID */}
                      <td className="py-5 px-6 font-mono text-sm font-semibold" style={{ color: colorPalette.White }}>
                        {order.id}
                      </td>

                      {/* Mesa */}
                      <td className="py-5 px-6 text-sm font-medium" style={{ color: colorPalette.White }}>
                        {order.tableId}
                      </td>

                      {/* Comensales */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" style={{ color: colorPalette.White, opacity: 0.7 }} />
                          <span className="text-sm" style={{ color: colorPalette.White }}>
                            {order.guests}
                          </span>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="py-5 px-6">
                        <div className="space-y-1 max-w-xs">
                          {order.orderDetail.map((item, idx) => (
                            <div key={idx} className="text-xs" style={{ color: colorPalette.White, opacity: 0.85 }}>
                              {item.name}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Fecha/Hora */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" style={{ color: colorPalette.White, opacity: 0.5 }} />
                          <div>
                            <div className="text-xs" style={{ color: colorPalette.White }}>
                              {fecha.toLocaleDateString()}
                            </div>
                            <div className="text-xs opacity-60" style={{ color: colorPalette.White }}>
                              {fecha.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Método de Pago */}
                      <td className="py-5 px-6 text-sm" style={{ color: colorPalette.White }}>
                        {order.paymentMethod}
                      </td>

                      {/* Total */}
                      <td className="py-5 px-6 text-right font-bold text-base" style={{ color: colorPalette.White }}>
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
                  <td colSpan={6} className="py-4 px-6 text-base font-bold text-right" style={{ color: colorPalette.White }}>
                    TOTAL GENERAL
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-xl" style={{ color: colorPalette.White }}>
                    ${totalGeneral.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="p-6 rounded-xl" style={{ backgroundColor: colorPalette.Charcoal }}>
            <p className="text-xs opacity-70 mb-2" style={{ color: colorPalette.White }}>Total Órdenes</p>
            <p className="text-3xl font-bold" style={{ color: colorPalette.White }}>{orders.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
