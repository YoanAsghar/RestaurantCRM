import { Order } from "./order";

export class Table {

  id: number;
  order?: Order;

  constructor(id: number, order?: Order) {
    this.id = id;
    this.order = order;

  }
}
