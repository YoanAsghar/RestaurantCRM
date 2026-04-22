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
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(order)
    })
    console.log( await response.json());
    if(!response.ok) throw new Error("Problem fetching orders");

    return await response.json();
  }
}
