
//TESTS
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

//Test imports

const App = () => {
const [currentTab, setCurrentTab] = useState(BodyTabs.mesas);
const [tables, setTables] = useState<Table[]>([...Table.TableInstances]);
const [currentTableSelectedId, setCurrentTableSelectedId] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Retrieve all the created tables when the app loads first
  useEffect(() => {
    TableServices.getAll().then(setTables);
  }, [])

 const selectedTable = tables.find(t => t.id == currentTableSelectedId)

 const handleUpdateTable = (updatedTable: Table) => {
   setTables(prev => prev.map(t => t.id === updatedTable.id ? updatedTable : t));
 };

 const handleAddTable = () => {
   const newTable = new Table();
   setTables(prev => [...prev, newTable]);
 };

 const handleRemoveTable = () => {
   if (tables.length === 0) return;
   const newTables = tables.slice(0, -1);
   setTables(newTables);
   if (currentTableSelectedId !== newTables[newTables.length - 1]?.id) {
     setCurrentTableSelectedId(newTables[newTables.length - 1]?.id);
   }
 };

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar username={"BussinesName"} setTabChange={setCurrentTab} currentTab={currentTab}/>

      <section className="flex-1 h-full">
        <main className="w-full h-full"> 

          {currentTab === BodyTabs.mesas && (
            <div className="h-full flex flex-row w-full">
              <TablesContent tables={tables} onSelect={setCurrentTableSelectedId} onAddTable={handleAddTable} onRemoveTable={handleRemoveTable} />
              <TableInformation 
                key={currentTableSelectedId} 
                table={selectedTable} 
                onUpdateTable={handleUpdateTable}
                setIsLoading = {setIsLoading}
              />
            </div>
          )}

          {currentTab === BodyTabs.ordenes && <OrdersContent/>}
          {currentTab === BodyTabs.inventario && <InventoryContent/>}
          {isLoading === true && <LoadingOverlay isVisible={true} message="Procesando pago"/> }
        </main>
      </section>
    </div>
  )
}

export default App
