import ManageProductsPanel from "./ManageProductsPanel"
import Sidebar from "./Sidebar"
import { Product } from "../../models/product";

interface InventoryContentPromps {
  products: Product[];
  setProducts: (product: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const AdminPanel = ({products, setProducts, setIsLoading}: InventoryContentPromps) => {
  return (
    <div className="flex flex-row">
      <Sidebar/>
      <ManageProductsPanel setProducts={setProducts} products={products} setIsLoading={setIsLoading} />
    </div>
  )
}

export default AdminPanel
