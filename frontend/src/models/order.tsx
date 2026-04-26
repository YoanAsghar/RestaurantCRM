import type { orderDetail } from "./orderDetails";

export enum PaymentMethod{
  CASH = "CASH",
  CARD = "CARD",
  BANK_TRANS = "BANK_TRANS"
}

export class Order{
  public static OrderInstances: Order[] = [];

  id: number;
  totalPrice: number;
  orderDate: Date;
  guests: number;
  tip: number;
  paymentMethod: PaymentMethod;
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
    this.paymentMethod = PaymentMethod.CASH;
  }

  public static getAllOrderInstances(){
    return this.OrderInstances;
  }
}

