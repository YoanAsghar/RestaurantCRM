import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { BodyTabs } from "./types";
import TablesContent from "./components/mainTabs/TablesContent";
import DomicilesContent from "./components/mainTabs/DomicilesContent";
import InventoryContent from "./components/mainTabs/InventoryContent";
import OrdersContent from "./components/mainTabs/OrdersContent";

//Test imports
import { testTables } from "./test_objects";

const App = () => {
const [currentTab, setCurretTab] = useState(BodyTabs.mesas);

  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar username={"BussinesName"} setTabChange={setCurretTab} currentTab={currentTab}/>

      <section className="flex-1 h-full">
        <main className="w-full h-full">
          {currentTab === BodyTabs.mesas && <TablesContent tables={testTables}/>}
          {currentTab === BodyTabs.ordenes && <OrdersContent/>}
          {currentTab === BodyTabs.inventario && <InventoryContent/>}
          {currentTab === BodyTabs.domicilios && <DomicilesContent/>}
        </main>
      </section>
    </div>
  )
}

export default App
