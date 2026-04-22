
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Table } from "./models/table";
import { BodyTabs } from "./types";
import InventoryContent from "./components/mainTabs/InventoryContent";
import { OrdersContent } from "./components/mainTabs/OrdersContent";
import TablesContent from "./components/mainTabs/TablesContent";
import TableInformation from "./components/mainTabs/tableInformation";
import LoadingOverlay from "./components/LoadingOverlay";
import { TableServices } from "./services/TableServices";
import type { Product } from "./models/product";
import { ProductServices } from "./services/ProductServices";

const App = () => {
const [currentTab, setCurrentTab] = useState(BodyTabs.mesas);

  //Table states
const [tables, setTables] = useState<Table[]>([]);
const [currentTableSelectedId, setCurrentTableSelectedId] = useState<number>(1);

  //Prodcut states
  const [products, setProducts] = useState<Product[]>([]);


const [isLoading, setIsLoading] = useState(false);
  
  //
  // TABLES RELATED FUNCTIONS
  //

  // Retrieve all the created tables when the app loads first
  useEffect(() => {
    TableServices.getAll().then(setTables);
  }, [])

 const selectedTable = tables.find(t => t.id == currentTableSelectedId)

 const handleUpdateTable = (updatedTable: Table) => {
   setTables(prev => prev.map(t => t.id === updatedTable.id ? updatedTable : t));
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
        console.error("Error removing table:", error);
    } finally {
        setIsLoading(false);
    }
 };

  //
  // PRODUCTS RELATED FUNCTIONS
  //
  
  // get all products at the start of the program
    
  useEffect(() =>{
    ProductServices.getAll().then(setProducts);
  }, [])

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar username={"BussinesName"} setTabChange={setCurrentTab} currentTab={currentTab}/>

      <section className="flex-1 h-full">
        <main className="w-full h-full"> 

          {currentTab === BodyTabs.mesas && (
            <div className="h-full flex flex-row w-full">
              <TablesContent tables={tables} onSelect={setCurrentTableSelectedId} onAddTable={handleAddTable} onRemoveTable={handleRemoveTable} />
              <TableInformation 
                products={products}
                key={currentTableSelectedId} 
                table={selectedTable} 
                onUpdateTable={handleUpdateTable}
                setIsLoading = {setIsLoading}
              />
            </div>
          )}

          {currentTab === BodyTabs.ordenes && <OrdersContent/>}
          {currentTab === BodyTabs.inventario && <InventoryContent products={products}/>}
          {isLoading === true && <LoadingOverlay isVisible={true} message="Procesando pago"/> }
        </main>
      </section>
    </div>
  )
}

export default App
