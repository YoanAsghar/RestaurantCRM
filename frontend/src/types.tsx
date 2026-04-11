export enum BodyTabs {
  mesas = "mesas",
  ordenes = "ordenes",
  inventario = "inventario",
  domicilios = "domicilios"
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
  onSelect: (id: number) => void;
}

export interface Table {
  id: number;
  ordenActual: Product[]; // Array of products
  cantidadDePersonas: number;
  precioACobrar: number;
}

export interface TableInformationProps{
  table: Table | undefined;
  onUpdateTable: (updatedTable: Table) => void;
}

export interface TableCardProps {
  table: Table;
  onSelect: (id: number) => void;
}

export interface Product{
  id: number;
  name: string;
  price: number;
}

