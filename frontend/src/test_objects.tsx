import { type Product, type Table} from "./types";

export const ProductExample1 = {
  id: 1,
  cantidad: 1,
  name: "Hamburguesa sencilla",
  price: 12000,
  stock: 0
};

export const ProductExample2 = {
  id: 2,
  cantidad: 1,
  name: "Hamburguesa especial",
  price: 15000,
  stock: 0
};

export const ProductExample3 = {
  id: 3,
  cantidad: 1,
  name: "Perro sencillo",
  price: 9000,
  stock: 0
};


export const tables: Table[] = [
  {
    id: 1,
    ordenActual: [],
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
    ordenActual: [],
    cantidadDePersonas: 4,
    precioACobrar: 45.00
  },
  {
    id: 4,
    ordenActual: [],
    cantidadDePersonas: 1,
    precioACobrar: 15.75
  },
  {
    id: 5,
    ordenActual: [],
    cantidadDePersonas: 2,
    precioACobrar: 38.20
  },
  {
    id: 6,
    ordenActual: [],
    cantidadDePersonas: 1,
    precioACobrar: 3
  }
];

export const ProductsTest: Product[] = [
  {
    id: 1,
    name: "Perro sencillo",
    price: 9000,
  },
  {
    id: 2,
    name: "Perro especial",
    price: 12500,
  },
  {
    id: 3,
    name: "Hamburguesa clásica",
    price: 14000,
  },
  {
    id: 4,
    name: "Hamburguesa doble carne",
    price: 18500,
  },
  {
    id: 5,
    name: "Salchipapa",
    price: 11000,
  },
  {
    id: 6,
    name: "Salchipapa especial",
    price: 14500,
  },
  {
    id: 7,
    name: "Arepa con queso",
    price: 6500,
  },
  {
    id: 8,
    name: "Perro caliente con tocineta",
    price: 13500,
  },
  {
    id: 9,
    name: "Papas fritas",
    price: 7500,
  },
  {
    id: 10,
    name: "Gaseosa 500ml",
    price: 4500,
  },
  {
    id: 11,
    name: "Jugo natural",
    price: 6000,
  },
  {
    id: 12,
    name: "Cerveza",
    price: 8000,
  },
  {
    id: 13,
    name: "Combo perro + gaseosa",
    price: 13500,
  },
  {
    id: 14,
    name: "Combo hamburguesa + papas + gaseosa",
    price: 22000,
  },
  {
    id: 15,
    name: "Helado",
    price: 5500,
  },
  {
    id: 16,
    name: "Empanada de carne",
    price: 3500,
  },
  {
    id: 17,
    name: "Chorizo con arepa",
    price: 9500,
  },
  {
    id: 18,
    name: "Agua",
    price: 3000,
  },
];


