import { useState, useMemo } from "react";
import { colorPalette } from "../../colorPallete";
import { Product } from "../../models/product";
import ProductCards from "../ProductCards";

interface InventoryContentPromps {
  products: Product[];
  productCategories: string[];
}

const MenuContent = ({ products, productCategories } : InventoryContentPromps) => {
  //Searchbar status
  const [searchQuery, setSearchQuery] = useState("");

  //Current category tab
  const [currentCategoryTab, setCurrentCategoryTab] = useState<string>("");

  //Show images toggle state
  const [showImages, setShowImages] = useState(false);

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
          <div className="mb-4 h-12 relative flex flex-row items-center m-8 gap-4">
            <div className="relative flex-1">
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

            <div className="flex items-center gap-2 text-white">
              <span className="text-sm font-medium">Imágenes</span>
              <button
                onClick={() => setShowImages(!showImages)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${showImages ? "bg-green-500" : "bg-gray-600"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${showImages ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
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
            <ProductCards key={product.id} product={product} showImages={showImages} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuContent;
