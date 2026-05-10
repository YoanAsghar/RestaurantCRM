import { useState, useMemo } from "react";
import { colorPalette } from "../../colorPallete";
import { Product } from "../../models/product";
import { ProductServices } from "../../services/ProductServices";
import ProductCards from "../ProductCards";

interface InventoryContentPromps {
  products: Product[];
  setProducts: (product: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const InventoryContent = ({ products, setProducts, setIsLoading } : InventoryContentPromps) => {
  //Searchbar status
  const [searchQuery, setSearchQuery] = useState("");
  
  //Current category tab
  const [currentCategoryTab, setCurrentCategoryTab] = useState<string>("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);


  return (
    <div
      className="h-full w-full overflow-auto"
      style={{ backgroundColor: colorPalette.DeepTwilight }}
    >
      <div className="-8">
        <div
          className="flex flex-col w-screen"
          style={{ backgroundColor: colorPalette.Navy }}
        >
          <div className="mb-4 h-12 relative flex flex-column m-8">
            <img
              src="/search_icon_white.png"
              alt="Buscar"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar producto..."
              className="w-full text-white rounded-lg p-3 pl-12 focus:outline-none focus:border-purple-500"
              style={{ backgroundColor: colorPalette.Charcoal }}
            />
          </div>

          <div
            className="flex flex-row ml-8 mb-4
          "
          >
            <button
              className="font-bold bg-white m-2 rounded rounded-lg text-white hover:invert p-3 transition-transform duration-300 cursor-pointer hover:scale-90"
              style={{ backgroundColor: colorPalette.Charcoal }}
            >
              Hamburguesas
            </button>
            <button
              className="font-bold bg-white m-2 rounded rounded-lg text-white hover:invert p-3 transition-transform duration-300 cursor-pointer hover:scale-90"
              style={{ backgroundColor: colorPalette.Charcoal }}
            >
              Pizzas
            </button>
          </div>
        </div>

        <div className="flex flex-wrap">
          {filteredProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryContent;
