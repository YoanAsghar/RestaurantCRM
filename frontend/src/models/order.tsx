import type { orderDetail } from "./orderDetails";

export enum PaymentMethod{
  CASH = "efectivo",
  CARD = "tarjeta",
  BANK_TRANS = "transferencia"
}

export class Order{
  public static OrderInstances: Order[] = [];

  id: number;
  totalPrice: number;
  orderDate: Date;
  guests: number;
  tip: number;
  PaymentMethod: PaymentMethod;
  tableId: number;
  orderDetail: orderDetail[];

  constructor(tableId: number){
    this.id = 0;
    this.tableId = tableId;
    this.orderDetail = [];
    this.totalPrice = 0;
    this.orderDate = new Date();
    this.guests = 0;
    this.tip = 0;
    this.PaymentMethod = PaymentMethod.CASH;
  }

  public static getAllOrderInstances(){
    return this.OrderInstances;
  }
}

