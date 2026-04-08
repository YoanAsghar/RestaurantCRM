import { tables } from "./test_objects";
//TESTS
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { BodyTabs } from "./types";
import DomicilesContent from "./components/mainTabs/DomicilesContent";
import InventoryContent from "./components/mainTabs/InventoryContent";
import OrdersContent from "./components/mainTabs/OrdersContent";
import TablesContent from "./components/mainTabs/TablesContent";
import TableInformation from "./components/mainTabs/tableInformation";

//Test imports

const App = () => {
const [currentTab, setCurrentTab] = useState(BodyTabs.mesas);
const [currentTableSelectedId, setCurrentTableSelectedId] = useState<number>(tables[0].id);

 const selectedTable = tables.find(t => t.id == currentTableSelectedId)

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar username={"BussinesName"} setTabChange={setCurrentTab} currentTab={currentTab}/>

      <section className="flex-1 h-full">
        <main className="w-full h-full"> 

          {currentTab === BodyTabs.mesas && (
            <div className="h-full flex flex-row w-full">
              <TablesContent tables={tables} onSelect={setCurrentTableSelectedId} />
              <TableInformation table={selectedTable}/>
            </div>
          )}

          {currentTab === BodyTabs.ordenes && <OrdersContent/>}
          {currentTab === BodyTabs.inventario && <InventoryContent/>}
          {currentTab === BodyTabs.domicilios && <DomicilesContent/>}
        </main>
      </section>
    </div>
  )
}

export default App
