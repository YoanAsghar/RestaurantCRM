import { config } from "../config";
import { Table } from "../models/table";

const API_URL = `${config.apiRoute}/api/v1/Table`

export const TableServices = {
  getAll: async (): Promise<Table[]> => {
      const response = await fetch(API_URL);
      if(!response.ok) throw new Error("Error fetching tables");
      
      const tables = await response.json();

      return tables.map((table: Table, index: number) => ({
        ...table,
        id: index + 1
      }));
  },

  createTable: async (): Promise<Table> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({tableNumber: 0})
    })
    
    if(!response.ok)throw new Error("Error creating table");

    return await response.json();
  },

  deleteTable: async (): Promise<Table> => {
      const response = await fetch(API_URL, {
      method: 'DELETE',
      })

      return await response.json();
    }
}
