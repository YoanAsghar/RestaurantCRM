import { useState } from "react";
import { colorPalette, type Product, type TableInformationProps } from "../../types";

const TableInformation = ({ table }: TableInformationProps) => {
  const [activePaymentButton, setActivePaymentButton] = useState(0);
  const [amountOfPersons, setAmountOfPersons] = useState(1);
  const [propina, setPropina] = useState(0);

  const total = (table?.ordenActual.reduce((sum, item) => sum + item.price, 0) || 0) + propina;

  return (
    <div className="h-full w-full lg:w-[30%] flex flex-col overflow-hidden">
      {/* CABECERA */}
      <div 
        className="shrink-0 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        style={{ backgroundColor: colorPalette.Navy }}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">{`Mesa ${table?.id}`}</h2>
          <button className="bg-red-600 hover:bg-red-700 p-2.5 rounded-xl transition-colors">
            <img className="size-5" src="/trash_icon.png" alt="Eliminar" />
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Personas:</label>
            <input
              type="text"
              value={amountOfPersons}
              onChange={(e) => setAmountOfPersons(Number(e.target.value) || 0)}
              className="bg-black text-white text-center w-16 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white text-sm">Propina:</label>
            <input
              type="text"
              value={propina}
              onChange={(e) => setPropina(Number(e.target.value) || 0)}
              className="bg-black text-white text-center w-20 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      

      {/* PEDIDOS ACTUALES */}
      <div 
        className="flex-1 flex flex-col min-h-0"
        style={{ backgroundColor: colorPalette.DeepTwilight }}
      >
        <div className="flex-1 overflow-auto p-4">
          <table className="w-full text-white">
            <thead className="top-0" style={{ backgroundColor: colorPalette.DeepTwilight }}>
              <tr>
                <th className="text-left py-3 px-2">Artículo</th>
                <th className="text-center py-3 px-2">Precio</th>
                <th className="text-center py-3 px-2">Servido</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {table?.ordenActual.map((product: Product) => (
                <tr key={product.id} className="border-b border-white/10">
                  <td className="py-3 px-2">{product.name}</td>
                  <td className="py-3 px-2 text-center">${product.price}</td>
                  <td className="py-3 px-2 text-center">✗</td>
                  <td className="py-3 px-2">
                    <img
                      className="cursor-pointer mx-auto hover:scale-110 transition-transform"
                      src="/trash_icon.png"
                      alt="Eliminar"
                    />
                  </td>
                </tr>
              ))}

              {propina !== 0 && (
                <tr>
                  <td colSpan={4} className="py-3 px-2 font-medium">
                    Propina: ${propina}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="p-5">
          <div className="flex justify-between items-center text-xl font-bold text-white">
            <span>Total:</span>
            <span>${total.toFixed(0)}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b border-white/10">
        <h2 className="px-5 pt-5 pb-3 text-xl font-semibold text-white">
          Agregar productos
        </h2>
        <div className="relative w-full px-4">   {/* Contenedor relative */}
          <img 
            src="./trash_icon.png" 
            alt="Buscar" 
            className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          />

          <input 
            type="text" 
            placeholder="Buscar producto"
            className="w-full bg-indigo-950 text-white rounded-lg p-3 pl-14 border border-purple-950 focus:outline-none focus:border-purple-400"
          />
        </div>
        <ul className="flex flex-col w-full">
          {table?.ordenActual.map((product) => (
            <li className="flex flex-row ml-4 mr-4 m-1 justify-between content-between rounded-lg text-white p-2 bg-purple-950">
              <div className="flex flex-row items-center">
                <p className="text-1lg">{product.name}</p>
                <p className="text-xs pl-5">${product.price}</p>
              </div>
              <button className="mr-5-5 pr-4"> asdasdasd </button>
            </li>
          ))}
        </ul>
      </div>

      {/* MÉTODOS DE PAGO */}
      <div className="shrink-0 bg-black p-5 space-y-4">
        <h2 className="text-2xl font-semibold text-white">Métodos de pago</h2>

        <div className="grid grid-cols-3 gap-3">
          <PaymentButton
            active={activePaymentButton === 1}
            onClick={() => setActivePaymentButton(1)}
            icon="/currency_icon.png"
            label="Efectivo"
          />
          <PaymentButton
            active={activePaymentButton === 2}
            onClick={() => setActivePaymentButton(2)}
            icon="/dollar_icon.png"
            label="Transferencia"
          />
          <PaymentButton
            active={activePaymentButton === 3}
            onClick={() => setActivePaymentButton(3)}
            icon="/credit_card.png"
            label="Tarjeta"
          />
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 h-14 rounded-2xl text-white font-bold text-xl transition-colors">
          Procesar pago
        </button>
      </div>
    </div>
  );
};

const PaymentButton = ({ active, onClick, icon, label }: any) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-3 rounded-2xl cursor-pointer transition-all
      ${active 
        ? "bg-purple-950 scale-105" 
        : "bg-zinc-900 hover:bg-zinc-800"}`}
  >
    <img className="w-8 h-8 mb-1" src={icon} alt={label} />
    <p className="text-white text-sm font-medium">{label}</p>
  </div>
);

export default TableInformation;
