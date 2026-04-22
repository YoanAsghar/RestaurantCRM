import { Product } from "./product";

enum paymentMethod{
  CASH = "efectivo",
  CARD = "tarjeta",
  BANK_TRANS = "transferencia"
}

export class Order{
  public static OrderInstances: Order[] = [];

  id: number;
  tableId: number;
  orderDetail: Product[];
  total: number;
  date: Date;
  guests: number;
  tip: number;
  paymentMethod: paymentMethod;

  constructor(tableId: number){
    this.id = Order.OrderInstances.length === 0
    ? 1
    : Math.max(...Order.OrderInstances.map(o => o.id)) + 1;
    this.tableId = tableId;
    this.orderDetail = [];
    this.total = 0;
    this.date = new Date();
    this.guests = 0;
    this.tip = 0;
    this.paymentMethod = paymentMethod.CASH;
  }

  public static getAllOrderInstances(){
    return this.OrderInstances;
  }
}

