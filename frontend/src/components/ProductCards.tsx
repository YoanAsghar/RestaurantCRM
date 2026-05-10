import { colorPalette } from "../colorPallete"
import { Product } from "../models/product"

interface ProductCardsProps {
  product: Product;
}

const ProductCards = ({product} :ProductCardsProps)  => {
  return (
    <div
      className="rounded-xl w-70 flex flex-col cursor-pointer m-2 shadow-lg hover:scale-90 transition-transform overflow-hidden bg-[#1b1b1c]"
    >
      <div className="h-40 w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover" 
          src={product.image || "/logoipsum-small.png"} 
          alt={product.name} 
        />
      </div>
      <div className="flex flex-row items-center p-5 h-20">
        <div className="flex flex-col">
          <h2 className="mt-1 mb-1 text-xs rounded-lg p-2 w-fit" style={{backgroundColor: colorPalette.DeepTwilight}}>{product.category}</h2>
          <h2 className="text-white text-lg font-bold truncate w-44">{product.name}</h2>
          <h2 className="text-gray-500 text-sm font-semibold">${product.price.toLocaleString()}</h2>
        </div>
      </div>
      <div className="flex flex-col px-5 pb-5 flex-1">
        <p className="text-gray-500 text-xs line-clamp-3 overflow-hidden">
          {product.description || "Sin descripción disponible."}
        </p>
        <p className="text-gray-500 text-xs line-clamp-3 overflow-hidden mt-5">
          PRODUCT-ID-{product.id}
        </p>
      </div>
    </div>
  )
}

export default ProductCards
