import { Product } from "./product";

export class Table {
  private static TableInstances: Table[] = [];

  id: number;
  ordenActual: Product[]; // Array of products
  cantidadDePersonas: number;
  precioACobrar: number;

  constructor(
    id: number,
    ordenActual: Product[],
    cantidadDePersonas: number,
    precioACobrar: number,
  ) {
    this.id = id;
    this.ordenActual = ordenActual;
    this.cantidadDePersonas = cantidadDePersonas;
    this.precioACobrar = precioACobrar;
  }

  public static getAllTableInstances(){
    return this.TableInstances;
  }
}

