import { useState, useMemo, type ChangeEvent } from "react";
import { colorPalette } from "../../colorPallete";
import { Product } from "../../models/product";
import { ProductServices } from "../../services/ProductServices";

interface InventoryContentPromps {
  products: Product[];
  setProducts: (product: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  productCategories: string[];
}

const ManageProductsPanel = ({ products, setProducts, setIsLoading, productCategories } : InventoryContentPromps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Estados para Crear
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({ name: "", price: 0, category: "", description: "", image: ""});
  const [isCustomCategory, setIsCustomCategory] = useState(false);


  // Estados para Editar
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ id: 0, name: "", price: 0, category: "", description: "", image: ""});
  
  async function HandleImageEditing(event: ChangeEvent<HTMLInputElement>): Promise<void>{
    const file = event.target.files?.[0];
    if(file){
      const reader = new FileReader();

      reader.onload = () => {
        setEditFormData((prevData) => ({
          ...prevData,
          image: reader.result as string
        }));
      }

      reader.onerror = (error) => {
        console.error(`Error reading file: ${error}`);
      }

      reader.readAsDataURL(file);
    }
  }

  async function HandleImageAdding(event: ChangeEvent<HTMLInputElement>): Promise<void>{
    const file = event.target.files?.[0];
    if(file){
      const reader = new FileReader();

      reader.onload = () => {
        setAddFormData((prevData) => ({
          ...prevData,
          image: reader.result as string
        }));
      }

      reader.onerror = (error) => {
        console.error(`Error reading file: ${error}`);
      }

      reader.readAsDataURL(file);
    }
  }

  //Filtering products
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);


  return (
    <div
      className="h-screen w-full overflow-auto"
      style={{ backgroundColor: colorPalette.DeepTwilight }}
    >
      <div className="p-8 h-full">
        <div className="mb-4 h-12 relative flex flex-column">
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
            className="w-full bg-black text-white rounded-lg p-3 pl-12 border border-gray-700 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={() => {
              setAddFormData({ name: "", price: 0, category: "", description: "", image: ""});
              setIsCustomCategory(false);
              setIsAddModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer ml-4"
          >
            Agregar producto
            <img className="w-5 h-5" src="/plus.png" alt="" />
          </button>
        </div>

        <div
          className="rounded-xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: colorPalette.Charcoal }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    backgroundColor: colorPalette.Navy,
                    borderColor: colorPalette.DeepTwilight,
                  }}
                >
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    ID
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Nombre
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Precio
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Categoría
                  </th>
                  <th
                    className="text-left py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Descripcion
                  </th>
                  <th
                    className="text-right py-4 px-6 font-semibold text-sm"
                    style={{ color: colorPalette.White }}
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-opacity-50 transition-colors"
                    style={{ borderColor: `${colorPalette.Navy}60` }}
                  >
                    <td
                      className="py-5 px-6 font-mono text-sm font-semibold"
                      style={{ color: colorPalette.White }}
                    >
                      {product.id}
                    </td>
                    <td
                      className="py-5 px-6 text-sm font-medium"
                      style={{ color: colorPalette.White }}
                    >
                      {product.name}
                    </td>
                    <td
                      className="py-5 px-6 text-sm font-medium"
                      style={{ color: colorPalette.White }}
                    >
                      ${product.price.toLocaleString()}
                    </td>
                    <td
                      className="py-5 px-6 text-sm font-medium"
                      style={{ color: colorPalette.White }}
                    >
                      {product.category}
                    </td>
                    <td
                      className="py-5 px-6 font-mono text-sm font-semibold over"
                      style={{ color: colorPalette.White }}
                    >
                      {product.description}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            setEditFormData({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              category: product.category,
                              description: product.description,
                              image: product.image
                            });
                            setIsEditModalOpen(true);
                          }}
                          className="text-white p-2 rounded-lg cursor-pointer flex flex-row"
                          style={{backgroundColor: colorPalette.DeepTwilight}}
                        >
                          <p className="pr-2 truncate">Editar</p>
                          <img
                            className="w-5 h-5 invert"
                            src="/edit.png"
                            alt="Editar"
                          />
                        </button>
                        <button
                          onClick={() => {
                            setIsLoading(true);
                            ProductServices.deleteProduct(product.id)
                              .then((productDeleted) => {
                                setProducts(
                                  products.filter(
                                    (p) => p.id !== productDeleted.id,
                                  ),
                                );
                              })
                              .finally(() => {
                                setIsLoading(false);
                              });
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg cursor-pointer flex flex-row"
                        >
                          <p className="pr-2 truncate">Eliminar</p>
                          <img
                            src="/trash_icon.png"
                            alt="Eliminar"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL PARA AGREGAR */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            className="rounded-xl p-6 w-96"
            style={{ backgroundColor: colorPalette.Charcoal }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Agregar Nuevo Producto
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={addFormData.name}
                  onChange={(e) =>
                    setAddFormData({ ...addFormData, name: e.target.value })
                  }
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                  placeholder="Ej. Hamburguesa"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Precio
                </label>
                <input
                  type="text"
                  value={addFormData.price || ""}
                  onChange={(e) =>
                    setAddFormData({
                      ...addFormData,
                      price: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Categoría
                </label>
                <select
                  value={isCustomCategory ? "Otros" : addFormData.category}
                  onChange={(e) => {
                    if (e.target.value === "Otros") {
                      setIsCustomCategory(true);
                      setAddFormData({ ...addFormData, category: "" });
                    } else {
                      setIsCustomCategory(false);
                      setAddFormData({ ...addFormData, category: e.target.value });
                    }
                  }}
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                >
                  <option value="" disabled>Seleccione una categoría</option>
                  {productCategories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                  <option value="Otros">Otros</option>
                </select>
              </div>
              {isCustomCategory && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Nueva Categoría
                  </label>
                  <input
                    type="text"
                    value={addFormData.category}
                    onChange={(e) =>
                      setAddFormData({ ...addFormData, category: e.target.value })
                    }
                    className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                    placeholder="Escriba la categoría"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Descripcion
                </label>
                <textarea
                  value={addFormData.description || ""}
                  onChange={(e) =>
                    setAddFormData({
                      ...addFormData,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Ej. 80Gr de carne de res, y salsa de la casa"
                />
              </div>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-2">
                <label className="block text-sm text-gray-400">
                  Agregar imagen
                </label>
                <label 
                  className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:scale-90 transition-all"
                  style={{ backgroundColor: colorPalette.DeepTwilight }}
                >
                  <input
                    onChange={HandleImageAdding}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <img src="/AddBox.png" alt="Add" className="w-4 h-4" />
                </label>
              </div>
              {addFormData.image && (
                <div className="mt-2 relative group">
                  <img
                    className="w-full max-h-48 object-contain rounded-lg border border-indigo-500 bg-black/20"
                    src={addFormData.image}
                  />
                  <button
                    onClick={() => setAddFormData({ ...addFormData, image: "" })}
                    className="absolute top-2 right-2 bg-red-600 hover:scale-90 p-1.5 rounded-full cursor-pointer transition-all shadow-lg"
                  >
                    <img src="/trash_icon.png" alt="Eliminar" className="w-4 h-4 invert" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsLoading(true);
                  let newProduct = new Product(
                    0,
                    addFormData.name,
                    addFormData.price,
                    addFormData.category,
                    addFormData.description,
                    addFormData.image
                  );
                  console.log(newProduct);
                  ProductServices.createProduct(newProduct)
                    .then((newProduct) => {
                      setProducts([...products, newProduct]);
                    })
                    .finally(() => {
                      setIsLoading(false);
                      setIsAddModalOpen(false);
                    });
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA EDITAR */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-scroll">
          <div
            className="rounded-xl p-6 w-96"
            style={{ backgroundColor: colorPalette.Charcoal }}
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Editar Producto
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Precio
                </label>
                <input
                  type="number"
                  value={editFormData.price || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      price: Number(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Descripcion
                </label>
                <textarea
                  value={editFormData.description || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      description: e.target.value,
                    })
                  }
                  className="w-full h-32 bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>
            </div>
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-2">
                <label className="block text-sm text-gray-400">
                  Cambiar imagen
                </label>
                <label 
                  className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:scale-90 transition-all"
                  style={{ backgroundColor: colorPalette.DeepTwilight }}
                >
                  <input
                    onChange={HandleImageEditing}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <img src="/AddBox.png" alt="Change" className="w-4 h-4" />
                </label>
              </div>
              {editFormData.image && (
                <div className="mt-2 relative group">
                  <img
                    className="w-full max-h-48 object-contain rounded-lg border border-indigo-500 bg-black/20"
                    src={editFormData.image}
                  />
                  <button
                    onClick={() => setEditFormData({ ...editFormData, image: "" })}
                    className="absolute top-2 right-2 bg-red-600 hover:scale-90 p-1.5 rounded-full cursor-pointer transition-all shadow-lg"
                  >
                    <img src="/trash_icon.png" alt="Eliminar" className="w-4 h-4 invert" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsLoading(true);
                  ProductServices.editProduct(
                    new Product(
                      editFormData.id,
                      editFormData.name,
                      editFormData.price,
                      editFormData.category,
                      editFormData.description,
                      editFormData.image
                    ),
                  )
                    .then((productEdited) => {
                      // ✅ Compara IDs correctamente
                      setProducts(
                        products.map((p) =>
                          p.id === productEdited.id ? productEdited : p,
                        ),
                      );
                    })
                    .finally(() => {
                      setIsLoading(false);
                      setIsEditModalOpen(false);
                    });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProductsPanel;
