import { Table } from "./models/table";

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
  onAddTable: () => void;
  onRemoveTable: () => void;
}


export interface TableInformationProps{
  table: Table | undefined;
  onUpdateTable: (updatedTable: Table) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export interface TableCardProps {
  table: Table;
  onSelect: (id: number) => void;
}


