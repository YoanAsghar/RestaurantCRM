'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import { Table } from "../../models/table";
import { TableServices } from "../../services/TableServices";
import { Product } from "../../models/product";
import { ProductServices } from "../../services/ProductServices";
import TablesContent from "./TablesContent";
import TableInformation from "./tableInformation";
import { useGlobalContext } from "../GlobalContext";

export default function MesasPage() {
  const { setIsLoading, isAuthenticated, role, isAuthChecking } = useGlobalContext();

  // Table related status and functions
  const [tables, setTables] = useState<Table[]>([]);
  const [currentTableSelectedId, setCurrentTableSelectedId] = useState<number>(1);

  // Derive the selected table from the tables array (memoized to prevent new object references)
  const selectedTable = useMemo(
    () => tables.find(t => t.id === currentTableSelectedId) || tables[0] || new Table(currentTableSelectedId),
    [tables, currentTableSelectedId]
  );

  // Retrieve all the created tables
  useEffect(() => {
    if (!isAuthenticated || isAuthChecking) return;
    TableServices.getAll()
      .then(setTables)
      .catch(console.error);
  }, [isAuthenticated, isAuthChecking]);

  const handleUpdateTable = useCallback((updatedTable: Table) => {
    setTables((prev) =>
      prev.map((t) => (t.id === updatedTable.id ? updatedTable : t)),
    );
  }, []);

  const handleSelectTable = useCallback((table: Table) => {
    setCurrentTableSelectedId(table.id);
  }, []);

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
      const selected = tables.find(t => t.id === currentTableSelectedId) ?? tables[0];
      if (selected?.id) await TableServices.deleteTable(selected.id);
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
    if (!isAuthenticated || isAuthChecking) return;
    ProductServices.getAll()
      .then(setProducts)
      .catch(console.error);
  }, [isAuthenticated, isAuthChecking]);

  return (
    <div className="tab-content-wrapper flex flex-row w-full h-full">
      <TablesContent
        selectedTable={selectedTable}
        tables={tables}
        onSelect={setCurrentTableSelectedId}
        onAddTable={handleAddTable}
        onRemoveTable={handleRemoveTable}
        role={role}
        setSelectedTable={handleSelectTable}
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

