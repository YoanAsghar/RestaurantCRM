import { Product } from "./product";

export class Order{
  private static OrderInstances: Order[] = [];

  id: number;
  tableId: number;
  items: Product[];
  total: number;
  date: Date;
  guests: number;

  constructor(id: number, tableId: number, items: Product[], total: number, date: Date, guests: number){
    this.id = id;
    this.tableId = tableId;
    this.items = items;
    this.total = total;
    this.date = date;
    this.guests = guests;
  }

  public static getAllOrderInstances(){
    return this.OrderInstances;
  }
}

