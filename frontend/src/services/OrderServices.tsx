import { config } from "../config";
import type { Order } from "../models/order";

const API_URL = `${config.apiRoute}/api/v1/Order`

export const OrderServices = {
  getAll: async (page : number = 1): Promise<Order[]> => {
    const response = await fetch(API_URL + `?pageSize=20&page=${page}`);
    if(!response.ok) throw new Error ("Error fetching orders")

    return await response.json();
  },

  createOrder: async(order: Order): Promise<Order> => {
    const orderPayload = {
      id: order.id,
      totalPrice: order.totalPrice,
      orderDate: order.orderDate,
      guests: order.guests,
      tip: order.tip,
      PaymentMethod: order.paymentMethod, 
      tableId: order.tableId,
      orderDetail: order.orderDetail.map(detail => ({
        id: detail.id || 0,
        orderId: detail.orderId || 0,
        productId: detail.productId,
        quantity: detail.quantity
      }))
    };
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(orderPayload)
    });

    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if(!response.ok) {
      console.error("Error creating order (Raw):", data);
      throw new Error(typeof data === 'string' ? data : (data.title || "Problem creating order"));
    }

    return data;
  }
}
