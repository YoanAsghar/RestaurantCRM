export enum BodyTabs {
  mesas = "mesas",
  ordenes = "ordenes",
  inventario = "inventario",
  domicilios = "domicilios"
}

export interface tableCardProps {
  data: {
    id: number;
    pedidoActual: object;
    cantidadDePersonas: number;
    precioACobrar: number;
  }
}


export const colorPalette = {
  Black: "#02010a",
  PrusianBlue: "#04052e",
  DeepTwilight: "#140152",
  Navy: "#22007c",
  Charcoal: "#121212",
  White: "#f4f4f8"
}

export interface TableContentPrompts{
  tables: Table[];
}

export interface Table {
  id: number;
  ordenActual: any[]; // Array of products
  cantidadDePersonas: number;
  precioACobrar: number;
}
