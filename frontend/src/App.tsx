
import { OrderServices } from "./services/OrderServices";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Table } from "./models/table";
import InventoryContent from "./components/mainTabs/InventoryContent";
import { OrdersContent } from "./components/mainTabs/OrdersContent";
import TablesContent from "./components/mainTabs/TablesContent";
import TableInformation from "./components/mainTabs/tableInformation";
import LoadingOverlay from "./components/LoadingOverlay";
import { TableServices } from "./services/TableServices";
import type { Product } from "./models/product";
import { ProductServices } from "./services/ProductServices";
import type { Order } from "./models/order";
import AdminPanel from "./components/mainTabs/AdminPanel";

enum BodyTabs {
  mesas = "mesas",
  ordenes = "ordenes",
  inventario = "inventario",
  domicilios = "domicilios",
  admin = "admin"
}

const App = () => {
  const [currentTab, setCurrentTab] = useState(BodyTabs.mesas);

  //Table related status and functions
  const [tables, setTables] = useState<Table[]>([]);
  const [currentTableSelectedId, setCurrentTableSelectedId] = useState<number>(1);


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
  // Product states and functions
  //
  const [products, setProducts] = useState<Product[]>([]);

  // get all products at the start of the program
  useEffect(() =>{
    ProductServices.getAll().then(setProducts);
  }, [])



  //
  // Order states and functions
  //
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersSectionPage, setOrdersSectionPage] = useState(1);

  //get all orders when page first loads
  useEffect(() => {
    OrderServices.getAll(ordersSectionPage).then(setOrders).then;
  }, []);

  // get all orders when changing tabs
  useEffect(() => {
    setIsLoading(true);
    OrderServices.getAll(ordersSectionPage).then(setOrders);
    setIsLoading(false);
  }, [currentTab, ordersSectionPage]);


  //
  // Other states and functions
  //
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="flex flex-row h-screen w-screen overflow-hidden">
      <Sidebar username={"BussinesName"} setTabChange={setCurrentTab} currentTab={currentTab}/>

      <section className="flex-1 h-full overflow-hidden">
        <main className="w-full h-full flex flex-row"> 

          {/* Tab Mesas */}
          <div className={`tab-pane ${currentTab === BodyTabs.mesas ? "active" : ""}`}>
            <div className="tab-content-wrapper flex flex-row w-full h-full">
              <TablesContent tables={tables} onSelect={setCurrentTableSelectedId} onAddTable={handleAddTable} onRemoveTable={handleRemoveTable} />
              <TableInformation 
                products={products}
                key={currentTableSelectedId} 
                table={selectedTable} 
                onUpdateTable={handleUpdateTable}
                setIsLoading = {setIsLoading}
              />
            </div>
          </div>

          {/* Tab Ordenes */}
          <div className={`tab-pane ${currentTab === BodyTabs.ordenes ? "active" : ""}`}>
            <div className="tab-content-wrapper w-full h-full">
              <OrdersContent orders={orders} setPage={setOrdersSectionPage} page={ordersSectionPage} />
            </div>
          </div>

          {/* Tab Inventario */}
          <div className={`tab-pane ${currentTab === BodyTabs.inventario ? "active" : ""}`}>
            <div className="tab-content-wrapper w-full h-full">
              <InventoryContent products={products} setProducts={setProducts} setIsLoading={setIsLoading}/>
            </div>
          </div>

          {/* Admin tab*/}
          <div className={`tab-pane ${currentTab === BodyTabs.admin ? "active" : ""}`}>
            <div className="tab-content-wrapper w-full h-full">
              <AdminPanel />
            </div>
          </div>

          {isLoading === true && <LoadingOverlay isVisible={true} message="Procesando pago"/> }
        </main>
      </section>
    </div>
  )
}

export default App
