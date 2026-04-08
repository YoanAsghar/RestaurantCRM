import { useState } from "react";
import { colorPalette, type Product, type TableInformationProps } from "../../types"

const TableInformation = ({ table }: TableInformationProps) => {
  const [activePaymentButton, setActivePaymentButton] = useState(0);

  return (
    <div className="h-full w-[30%]">
      <div className="h-[30%]" style={{ backgroundColor: colorPalette.Navy }}>
        <div className="justify-between flex flex-row items-center">
          <h2 className="p-6">{`Mesa ${table?.id}`}</h2>
          <button className="bg-red-600 p-2 m-5 flex flex-row justify-center border-4 border-red-800 rounded-lg items-center cursor-pointer">
            <img className="size-7" src="/trash_icon.png" alt="" />
          </button>
        </div>

        <div className="grid grid-cols-6 grid-rows-3 grid-flow-col justify-center items-center p-2 gap-y-10">
          <button>lasd</button>
          <button>lasd</button>
          <button>lasd</button>
          <button>lasd</button>
          <button>lasd</button>
          <button>lasd</button>
        </div>
      </div>

      <div
        className="h-[45%]"
        style={{ backgroundColor: colorPalette.DeepTwilight }}
      >
        <h2 className="p-6 text-2xl">Pedidos actuales</h2>
        <div className="h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="sticky">
              <tr>
                <th className="text-white px-4 py-2 text-left">Articulo</th>
                <th className="text-white px-4 py-2">Precio</th>
                <th className="text-white px-4 py-2">Servido</th>
              </tr>
            </thead>
            <tbody>
              {table?.ordenActual.map((product: Product) => (
                <tr key={product.id} className="text-white">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2 text-center">{product.price}</td>
                  <td className="px-4 py-2 text-center">✗</td>
                  <td className="px-4 py-2 flex justify-center">
                    <img
                      className="cursor-pointer"
                      src="/trash_icon.png"
                      alt=""
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-6 text-white text-lg text-left sticky font-bold">
                  Total: $
                  {table?.ordenActual
                    .reduce((total, element) => total + element.price, 0)
                    .toFixed(2) || 0}{" "}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="h-[25%] bg-black">
        <h2 className="p-2 text-white text-2xl">Metodos de pago</h2>
        <div className="flex flex-row w-full justify-center items-center gap-6">
          <div
            onClick={() => setActivePaymentButton(1)}
            className={` p-6 h-25 w-38 rounded-2xl border-2 border-purple-950 flex flex-col items-center justify-center cursor-pointer 
${activePaymentButton === 1 ? "bg-purple-950" : "bg-black"}`}
          >
            <img className="m-2" src="/currency_icon.png" alt="" />
            <p className="text-white font-bold">Efectivo</p>
          </div>
          <div
            onClick={() => setActivePaymentButton(2)}
            className={` p-6 h-25 w-38 rounded-2xl border-2 border-purple-950 flex flex-col items-center justify-center cursor-pointer 
${activePaymentButton === 2 ? "bg-purple-950" : "bg-black"}`}
          >
            <img className="m-2" src="/dollar_icon.png" alt="" />
            <p className="text-white font-bold">Transferencia</p>
          </div>
          <div
            onClick={() => setActivePaymentButton(3)}
            className={` p-6 h-25 w-38 rounded-2xl border-2 border-purple-950 flex flex-col items-center justify-center cursor-pointer 
${activePaymentButton === 3 ? "bg-purple-950" : "bg-black"}`}
          >
            <img className="m-2" src="/credit_card.png" alt="" />
            <p className="text-white font-bold">Tarjeta</p>
          </div>
        </div>
        <button className="bg-purple-950 h-14 w-full mt-4 text-white font-bold text-2xl">
          Procesar pago
        </button>
      </div>
    </div>
  );
}

export default TableInformation
