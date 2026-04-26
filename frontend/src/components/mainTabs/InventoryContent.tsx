import { useState, useMemo } from "react";
import { colorPalette } from "../../types";
import { Product } from "../../models/product";

interface InventoryContentPromps {
  products: Product[];
}

const InventoryContent = ({ products } : InventoryContentPromps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Estados para Crear
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({ name: "", price: 0 });


  // Estados para Editar
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ id: 0, name: "", price: 0 });

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
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Inventario de Productos</h1>
          <button
            onClick={() => {
              setAddFormData({ name: "", price: 0 });
              setIsAddModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
          >
            <img className="w-5 h-5" src="/plus.png" alt="" />
            Agregar Producto
          </button>
        </div>

        <div className="mb-4 relative">
          <img 
            src="./search_icon.png" 
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
                    borderColor: colorPalette.DeepTwilight
                  }}
                >
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Nombre</th>
                  <th className="text-left py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Precio</th>
                  <th className="text-right py-4 px-6 font-semibold text-sm" style={{ color: colorPalette.White }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-opacity-50 transition-colors"
                    style={{ borderColor: `${colorPalette.Navy}60` }}
                  >
                    <td className="py-5 px-6 font-mono text-sm font-semibold" style={{ color: colorPalette.White }}>{product.id}</td>
                    <td className="py-5 px-6 text-sm font-medium" style={{ color: colorPalette.White }}>{product.name}</td>
                    <td className="py-5 px-6 text-sm font-medium" style={{ color: colorPalette.White }}>${product.price.toLocaleString()}</td>
                    <td className="py-5 px-6">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => {
                            setEditFormData({ id: product.id, name: product.name, price: product.price });
                            setIsEditModalOpen(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg cursor-pointer"
                        >
                          <img className="w-5 h-5" src="/edit_icon.png" alt="Editar" />
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 p-2 rounded-lg cursor-pointer">
                          <img className="w-5 h-5" src="/trash_icon.png" alt="Eliminar" />
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
          <div className="rounded-xl p-6 w-96" style={{ backgroundColor: colorPalette.Charcoal }}>
            <h2 className="text-xl font-bold text-white mb-4">Agregar Nuevo Producto</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                <input
                  type="text"
                  value={addFormData.name}
                  onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                  placeholder="Ej. Hamburguesa"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Precio</label>
                <input
                  type="text"
                  value={addFormData.price || ""}
                  onChange={(e) => setAddFormData({ ...addFormData, price: Number(e.target.value) || 0 })}
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg cursor-pointer">
                Cancelar
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg cursor-pointer">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA EDITAR */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="rounded-xl p-6 w-96" style={{ backgroundColor: colorPalette.Charcoal }}>
            <h2 className="text-xl font-bold text-white mb-4">Editar Producto</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Nombre</label>
                <input
                  type="text"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Precio</label>
                <input
                  type="number"
                  value={editFormData.price || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) || 0 })}
                  className="w-full bg-black text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg cursor-pointer">
                Cancelar
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg cursor-pointer">
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryContent;
