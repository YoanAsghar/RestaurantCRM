export interface ProductData {
  id: number;
  name: string;
  price: number;
}

export const ProductsTest: ProductData[] = [
  {
    id: 1,
    name: "Perro sencillo",
    price: 9000,
  },
  {
    id: 2,
    name: "Perro especial",
    price: 15000,
  },
  {
    id: 3,
    name: "Gaseosa",
    price: 3500,
  },
];

export interface TableData {
  id: number;
  ordenActual: ProductData[];
  cantidadDePersonas: number;
  precioACobrar: number;
}

export const tables: TableData[] = [
  {
    id: 1,
    ordenActual: [],
    cantidadDePersonas: 2,
    precioACobrar: 25.50
  }
];
