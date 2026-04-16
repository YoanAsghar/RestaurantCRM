import { Order } from "./order";

export class Table {
  public static TableInstances: Table[] = [
  {
    id: 1,
    order: new Order(1)
  }
  ];

  id: number;
  order: Order;

  constructor(id: number) {
    this.id = id;
    this.order = new Order(this.id);

    Table.TableInstances.push(this);
  }

}

