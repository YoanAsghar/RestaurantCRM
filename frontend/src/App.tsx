import { useMemo } from "react";
import { OrderServices } from "./services/OrderServices";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Table } from "./models/table";
import MenuContent from "./components/mainTabs/MenuContent";
import { OrdersContent } from "./components/mainTabs/OrdersContent";
import TablesContent from "./components/mainTabs/TablesContent";
import TableInformation from "./components/mainTabs/tableInformation";
import LoadingOverlay from "./components/LoadingOverlay";
import { TableServices } from "./services/TableServices";
import type { Product } from "./models/product";
import { ProductServices } from "./services/ProductServices";
import type { Order } from "./models/order";
import AdminPanel from "./components/AdminTabs/AdminPanel";
import Login from "./components/Login";
import KitchenView from "./components/mainTabs/KitchenView";

export enum BodyTabs {
  mesas = "mesas",
  cocina = "cocina",
  ordenes = "ordenes",
  inventario = "inventario",
  domicilios = "domicilios",
  admin = "admin"
}

const App = () => {
  const [currentTab, setCurrentTab] = useState(BodyTabs.mesas);

  //
  //  Authentication
  //

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState("");

  //
  //Table related status and functions
  //
  const [tables, setTables] = useState<Table[]>([]);
  const [currentTableSelectedId, setCurrentTableSelectedId] =
    useState<number>(1);
  const [selectedTable, setSelectedTable] = useState<Table>(
    tables[0] || new Table(1),
  );

  // Retrieve all the created tables when the app loads first
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
      console.error("Error removing table:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //
  // Product states and functions
  //
  const [products, setProducts] = useState<Product[]>([]);
  const [productCategories, setProductCategories] = useState<string[]>([]);

  // get all products at the start of the program
  useEffect(() => {
    ProductServices.getAll().then(setProducts);
  }, [isAuthenticated]);

  // Update the categories everytime a product is addded or eliminated
  useEffect(() => {
    if (!products) return;
    const categories = [
      ...new Set(
        products.map((p) => p.category).filter((c) => c && c.trim() !== ""),
      ),
    ];
    setProductCategories(categories.sort());
    console.log("Calculated categories:", categories.sort());
  }, [products]);

  //
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersDateQuery, setOrdersDateQuery] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const activeOrders = useMemo(() => {
    return tables
      .filter((t) => t.order && t.order.orderDetail.length > 0)
      .map((t) => t.order!);
  }, [tables]);

  //get all orders when page first loads
  useEffect(() => {
    OrderServices.getAll(ordersDateQuery).then(setOrders);
  }, [isAuthenticated]);

  // get all orders when changing tabs
  useEffect(() => {
    OrderServices.getAll(ordersDateQuery).then(setOrders);
  }, [ordersDateQuery]);

  //
  // Other states and functions
  //
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Login
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setIsLoading={setIsLoading}
        setRole={setRole}
        setUsername={setUsername}
        role={role}
      />
      <Navbar
        setIsAuthenticated={setIsAuthenticated}
        username={username}
        setTabChange={setCurrentTab}
        currentTab={currentTab}
        setUsername={setUsername}
        setRole={setRole}
        role={role}
      />

      <section className="flex-1 overflow-hidden">
        <main className="w-full h-full flex flex-row relative">
          {/* Tab Mesas */}
          <div
            className={`tab-pane ${currentTab === BodyTabs.mesas ? "active" : ""}`}
          >
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
          </div>

          {/* Tab Ordenes */}
          <div
            className={`tab-pane ${currentTab === BodyTabs.ordenes ? "active" : ""}`}
          >
            <div className="tab-content-wrapper w-full h-full">
              <OrdersContent
                orders={orders}
                setOrdersDateQuery={setOrdersDateQuery}
                orderDatesQuery={ordersDateQuery}
              />
            </div>
          </div>

          {/* Tab cocina */}
          <div
            className={`tab-pane ${currentTab === BodyTabs.cocina ? "active" : ""}`}
          >
            <div className="tab-content-wrapper w-full h-full">
              <KitchenView activeOrders={activeOrders}/>
            </div>
          </div>

          {/* Tab Menu */}
          <div
            className={`tab-pane ${currentTab === BodyTabs.inventario ? "active" : ""}`}
          >
            <div className="tab-content-wrapper w-full h-full">
              <MenuContent
                products={products}
                productCategories={productCategories}
              />
            </div>
          </div>

          {/* Admin tab*/}
          <div
            className={`tab-pane ${currentTab === BodyTabs.admin ? "active" : ""}`}
          >
            <div className="tab-content-wrapper w-full h-full">
              <AdminPanel/>
            </div>
          </div>

          {isLoading === true && (
            <LoadingOverlay isVisible={true} message="Cargando..." />
          )}
        </main>
      </section>
    </div>
  );
}

export default App
