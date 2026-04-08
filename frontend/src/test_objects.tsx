import { type Table} from "./types";

export const ProductExample1 = {
  id: 1,
  cantidad: 1,
  name: "Hamburguesa sencilla",
  price: 5.99,
  stock: 0
};

export const ProductExample2 = {
  id: 2,
  cantidad: 1,
  name: "Hamburguesa especial",
  price: 8.99,
  stock: 0
};

export const ProductExample3 = {
  id: 3,
  cantidad: 1,
  name: "Perro sencillo",
  price: 6.00,
  stock: 0
};


export const tables: Table[] = [
  {
    id: 1,
    ordenActual: [ProductExample1, ProductExample1],
    cantidadDePersonas: 2,
    precioACobrar: 25.50
  },
  {
    id: 2,
    ordenActual: [],
    cantidadDePersonas: 0,
    precioACobrar: 0
  },
  {
    id: 3,
    ordenActual: [ProductExample3, ProductExample3],
    cantidadDePersonas: 4,
    precioACobrar: 45.00
  },
  {
    id: 4,
    ordenActual: [ProductExample3, ProductExample3, ProductExample1],
    cantidadDePersonas: 1,
    precioACobrar: 15.75
  },
  {
    id: 5,
    ordenActual: [ProductExample2,ProductExample1],
    cantidadDePersonas: 2,
    precioACobrar: 38.20
  },
  {
    id: 6,
    ordenActual: [ProductExample2],
    cantidadDePersonas: 1,
    precioACobrar: 3
  }
];

