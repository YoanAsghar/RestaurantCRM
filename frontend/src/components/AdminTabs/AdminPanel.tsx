import ManageProductsPanel from "./ManageProductsPanel"
import Sidebar from "./Sidebar"
import { Product } from "../../models/product";

interface InventoryContentPromps {
  products: Product[];
  setProducts: (product: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  productCategories: string[];
}

const AdminPanel = ({products, setProducts, setIsLoading, productCategories}: InventoryContentPromps) => {
  return (
    <div className="flex flex-row">
      <Sidebar/>
      <ManageProductsPanel setProducts={setProducts} products={products} setIsLoading={setIsLoading} productCategories={productCategories}/>
    </div>
  )
}

export default AdminPanel
