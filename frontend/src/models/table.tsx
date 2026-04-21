import { Order } from "./order";

export class Table {
  public static TableInstances: Table[] = [];

  id: number;
  order?: Order;

  constructor(id?: number, order?: Order) {
    if (id !== undefined) {
      this.id = id;
    } else {
      this.id = Table.TableInstances.length === 0
        ? 1
        : Math.max(...Table.TableInstances.map(t => t.id)) + 1;
    }
    
    this.order = order;

    if (!Table.TableInstances.some(t => t.id === this.id)) {
      Table.TableInstances.push(this);
    }
  }
}
