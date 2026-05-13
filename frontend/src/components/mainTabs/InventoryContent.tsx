import { useState, useMemo } from "react";
import { colorPalette } from "../../colorPallete";
import { Product } from "../../models/product";
import ProductCards from "../ProductCards";

interface InventoryContentPromps {
  products: Product[];
  productCategories: string[];
}

const InventoryContent = ({ products, productCategories } : InventoryContentPromps) => {
  //Searchbar status
  const [searchQuery, setSearchQuery] = useState("");

  //Current category tab
  const [currentCategoryTab, setCurrentCategoryTab] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = currentCategoryTab === "" || p.category === currentCategoryTab;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, currentCategoryTab]);


  return (
    <div
      className="h-full w-full overflow-auto"
      style={{ backgroundColor: colorPalette.DeepTwilight }}
    >
      <div className="p-0">
        <div
          className="flex flex-col w-full"
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
          

          <div className="flex flex-row ml-8 mb-4 flex-wrap">
            <button
              onClick={() => setCurrentCategoryTab("")}
              className={`font-bold m-2 rounded-lg p-3 transition-all duration-300 cursor-pointer hover:scale-90 ${currentCategoryTab === "" ? "bg-white text-black" : "text-white"}`}
              style={{
                backgroundColor:
                  currentCategoryTab === ""
                    ? colorPalette.White
                    : colorPalette.Charcoal,
              }}
            >
              Todas
            </button>
            {productCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategoryTab(category)}
                className={`font-bold m-2 rounded-lg p-3 transition-all duration-300 cursor-pointer hover:scale-90 ${currentCategoryTab === category ? "bg-white text-black" : "text-white"}`}
                style={{
                  backgroundColor:
                    currentCategoryTab === category
                      ? colorPalette.White
                      : colorPalette.Charcoal,
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap p-4">
          {filteredProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryContent;
