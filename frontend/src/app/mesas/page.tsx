'use client';

import { useState, useEffect } from "react";
import { Table } from "../../models/table";
import { TableServices } from "../../services/TableServices";
import { Product } from "../../models/product";
import { ProductServices } from "../../services/ProductServices";
import TablesContent from "./TablesContent";
import TableInformation from "./tableInformation";
import { useGlobalContext } from "../GlobalContext";

export default function MesasPage() {
  const { setIsLoading, isAuthenticated, role } = useGlobalContext();

  // Table related status and functions
  const [tables, setTables] = useState<Table[]>([]);
  const [currentTableSelectedId, setCurrentTableSelectedId] = useState<number>(1);
  const [selectedTable, setSelectedTable] = useState<Table>(
    tables[0] || new Table(1),
  );

  // Retrieve all the created tables
  useEffect(() => {
    TableServices.getAll().then(setTables);
  }, [isAuthenticated]);

  const handleUpdateTable = (updatedTable: Table) => {
    setTables((prev) =>
      prev.map((t) => (t.id === updatedTable.id ? updatedTable : t)),
    );
  };

  const handleAddTable = async () => {
    setIsLoading(true);
    try {
      await TableServices.createTable();
      const updatedTables = await TableServices.getAll();
      setTables(updatedTables);
    } catch (error) {
      console.error("Error adding table:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveTable = async () => {
    setIsLoading(true);
    try {
      await TableServices.deleteTable();
      const updatedTables = await TableServices.getAll();
      setTables(updatedTables);
    } catch (error) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  // Product states (needed for TableInformation)
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ProductServices.getAll().then(setProducts);
  }, [isAuthenticated]);

  return (
    <div className="tab-content-wrapper flex flex-row w-full h-full">
      <TablesContent
        selectedTable={selectedTable}
        tables={tables}
        onSelect={setCurrentTableSelectedId}
        onAddTable={handleAddTable}
        onRemoveTable={handleRemoveTable}
        role={role}
        setSelectedTable={setSelectedTable}
      />
      <TableInformation
        products={products}
        key={currentTableSelectedId}
        table={selectedTable}
        onUpdateTable={handleUpdateTable}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

