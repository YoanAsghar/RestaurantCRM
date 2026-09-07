import { config } from "../config";
import { Table } from "../models/table";

const API_URL = `${config.apiRoute}/api/v1/Table`

export const TableServices = {
  getAll: async (): Promise<Table[]> => {
      const response = await fetch(API_URL, { credentials: "include" });
      if(!response.ok) throw new Error("Error fetching tables");
      
      const tables = await response.json();

      return tables.map((table: Table) => ({
        ...table,
        id: table.id as number
      }));
  },

  createTable: async (): Promise<Table> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({tableNumber: 0})
    })
    
    if(!response.ok)throw new Error("Error creating table");

    return await response.json();
  },

  deleteTable: async (id: number): Promise<Table> => {
      const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      credentials: "include",
      })

      if(!response.ok) throw new Error("Error deleting table");

      return await response.json();
    }
}
