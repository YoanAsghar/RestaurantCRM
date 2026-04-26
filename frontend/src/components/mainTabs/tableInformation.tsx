import { useEffect, useMemo, useState } from "react";
import { colorPalette } from "../../types";
import { Product } from "../../models/product";
import { Order, PaymentMethod } from "../../models/order";
import { OrderServices } from "../../services/OrderServices";
import { Table } from "../../models/table";
import { orderDetail } from "../../models/orderDetails";

interface TableInformationProps{
  table: Table | undefined;
  onUpdateTable: (updatedTable: Table) => void;
  setIsLoading: (isLoading: boolean) => void;
  products: Product[];
}

const TableInformation = ({ table, onUpdateTable, setIsLoading, products }: TableInformationProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [amountOfPersons, setAmountOfPersons] = useState(table?.order?.guests || 0);
  const [propina, setPropina] = useState(table?.order?.tip || 0);
  const [currentTab, setCurrenTab] = useState(true);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setAmountOfPersons(table?.order?.guests || 0);
    setPropina(table?.order?.tip || 0);
    setCurrentProducts(table?.order?.orderDetail || []);
  }, [table?.id]);

  useEffect(() => {
    const productsTotal = currentProducts.reduce((sum, item) => sum + (item.product?.price || 0), 0);
    setTotalPrice(productsTotal + propina);
  }, [currentProducts, propina]);

  const filteredProducts = useMemo(() => {
    if(!searchBarValue.trim()) return products
    return products.filter(product => product.name.toLowerCase().includes(searchBarValue));
  }, [searchBarValue, products])

  // Función para sincronizar los datos locales con el componente padre (y las tarjetas)
  const syncWithParent = (guests: number, orderDetail: orderDetail[], tip: number) => {
    if (!table) return;
    const updatedOrder = new Order(table.id);
    updatedOrder.guests = guests;
    updatedOrder.orderDetail = orderDetail;
    updatedOrder.tip = tip;
    updatedOrder.totalPrice = orderDetail.reduce((sum, item) => sum + (item.product?.price || 0), 0) + tip;

    onUpdateTable({
      ...table,
      order: updatedOrder
    });
  };

  function handlePersonsChange(value: number) {
    setAmountOfPersons(value);
    syncWithParent(value, currentProducts, propina);
  }

  function handlePropinaChange(value: number) {
    setPropina(value);
    syncWithParent(amountOfPersons, currentProducts, value);
  }

  function addProductToTable(item: Product){
    const newItems : Product[] = [];
    
    currentProducts.forEach((element: orderDetail) => {
      newItems.push(element.product);
    })

    setCurrentProducts(newItems);
    syncWithParent(amountOfPersons, newItems, propina);
  }

  function removeProductFromTable(index: number){
    const newItems = currentProducts.filter((_, i) => i !== index);
    setCurrentProducts(newItems);
    syncWithParent(amountOfPersons, newItems, propina);
  }

  function resetTableData(){
    setAmountOfPersons(0);
    setCurrentProducts([]);
    setPropina(0);

    if(table){
      onUpdateTable({
        ...table,
        order: undefined
      })
    }
  }

  function handleProcessPayment() {
    if (!table) return;

    //forEachProductCrete
    let productCounts = new Map<number , number>();
    products.forEach((product: Product) => {
      if(productCounts.has(product.id)){
        productCounts.set(product.id, productCounts.get(product.id)! + 1);
      }
      else{
        productCounts.set(product.id, 1);
      }
    });

    const orderDetails: orderDetail[] = Array.from(productCounts.entries()).map(([productId, quantity]) => ({

      id: 0,
      productId: productId,
      quantity: quantity,
      product: products.find(p => p.id === productId)
    }));

    const finalOrder = new Order(table.id);
    finalOrder.totalPrice = totalPrice;
    finalOrder.guests = amountOfPersons;
    finalOrder.tip = propina;
    finalOrder.PaymentMethod = paymentMethod;
    finalOrder.orderDetail = orderDetails;

    setIsLoading(true);
    try{
      OrderServices.createOrder(finalOrder);
    }catch(err){
      console.error(err)
    }finally{
      setIsLoading(false);
    }

    onUpdateTable({
      ...table,
      order: finalOrder
    });
    resetTableData();
  }

  return (
    <div className="h-full w-full lg:w-[30%] flex flex-col overflow-hidden">
      {/* CABECERA */}
      <div 
        className="shrink-0 p-4 flex flex-col sm:flex-row gap-4 orderDetail-start sm:orderDetail-center justify-between"
        style={{ backgroundColor: colorPalette.Navy }}
      >
        <div className="flex orderDetail-center gap-3">
          <h2 className="text-2xl font-bold text-white">{`Mesa ${table?.id}`}</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex orderDetail-center gap-2">
            <label className="text-white text-sm">Personas:</label>
            <input
              type="text"
              value={amountOfPersons}
              onChange={(e) => handlePersonsChange(Number(e.target.value) || 0)}
              className="bg-black text-white text-center w-16 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex orderDetail-center gap-2">
            <label className="text-white text-sm">Propina:</label>
            <input
              type="text"
              value={propina}
              onChange={(e) => handlePropinaChange(Number(e.target.value) || 0)}
              className="bg-black text-white text-center w-20 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full" style={{backgroundColor: colorPalette.DeepTwilight}}>
        <button className="cursor-pointer rounded-b-lg w-16 flex orderDetail-center justify-center" style={{backgroundColor: colorPalette.Navy}} onClick={() => setCurrenTab(!currentTab)}>
          <img className="p-1" src="/swap_icon.png" alt="" />
        </button>
      </div>

      {/* PEDIDOS ACTUALES */}
      {currentTab === true ? (
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
                {currentProducts.map((product: orderDetail, index: number) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-3 px-2">{product.product?.name}</td>
                    <td className="py-3 px-2 text-center">${product.product?.price}</td>
                    <td className="py-3 px-2 text-center">✗</td>
                    <td className="py-3 px-2">
                      <img
                        className="cursor-pointer mx-auto hover:scale-110 transition-transform"
                        src="/trash_icon.png"
                        alt="Eliminar"
                        onClick={() => removeProductFromTable(index)}
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
          <div className="p-5">
            <div className="flex justify-between orderDetail-center text-xl font-bold text-white">
              <span>Total:</span>
              <span>${totalPrice.toFixed(0)}</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Agregar productos */}
      {currentTab === false ? (
        <div 
          className="flex-1 flex flex-col min-h-0"
          style={{ backgroundColor: colorPalette.DeepTwilight }}
        >
          <h2 className="px-5 pt-5 pb-3 text-xl font-semibold text-white">
            Agregar productos
          </h2>
          <div className="relative w-full px-4">
            <img 
              src="./search_icon.png" 
              alt="Buscar" 
              className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
            <input 
              onChange={(e) => setSearchBarValue(e.target.value.toLowerCase())}
              type="text" 
              placeholder="Buscar producto"
              className="w-full bg-indigo-950 text-white rounded-lg p-3 pl-14 border border-purple-950 focus:outline-none focus:border-purple-400"
            />
          </div>
          <ul className="flex flex-col w-full mt-4 overflow-y-scroll">
            {filteredProducts.map((product) => (
              <li key={product.name + Math.random()} className="flex flex-row ml-4 mr-4 m-1 justify-between content-between rounded-lg text-white p-2 bg-purple-950">
                <div className="flex flex-row orderDetail-center">
                  <p className="text-1lg">{product.name}</p>
                  <p className="text-xs pl-5">${product.price}</p>
                </div>
                <button onClick={() => addProductToTable(product)} className="mr-5-5 pr-4 rounded-lg cursor-pointer"> 
                  <img className="h-full w-full bg-indigo-950 rounded-lg size-9" src="/plus.png" alt="" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* MÉTODOS DE PAGO */}
      <div className="shrink-0 bg-black p-5 space-y-4">
        <h2 className="text-2xl font-semibold text-white">Métodos de pago</h2>
        <div className="grid grid-cols-3 gap-3">
          <PaymentButton
            active={paymentMethod === PaymentMethod.CASH}
            onClick={() => setPaymentMethod(PaymentMethod.CASH)}
            icon="/dollar_icon.png"
            label="Efectivo"
          />
          <PaymentButton
            active={paymentMethod === PaymentMethod.BANK_TRANS}
            onClick={() => setPaymentMethod(PaymentMethod.BANK_TRANS)}
            icon="/currency_icon.png"
            label="Transferencia"
          />
          <PaymentButton
            active={paymentMethod === PaymentMethod.CARD}
            onClick={() => setPaymentMethod(PaymentMethod.CARD)}
            icon="/credit_card.png"
            label="Tarjeta"
          />
        </div>
        <button 
          onClick={handleProcessPayment} 
          className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 h-14 rounded-2xl text-white font-bold text-xl transition-colors"
        >
          Procesar pago
        </button>
      </div>
    </div>
  );
};

const PaymentButton = ({ active, onClick, icon, label }: any) => (
  <div
    onClick={onClick}
    className={`flex flex-col orderDetail-center justify-center p-3 rounded-2xl cursor-pointer transition-all
${active 
? "bg-purple-950 scale-105" 
: "bg-zinc-900 hover:bg-zinc-800"}`}
  >
    <img className="w-8 h-8 mb-1" src={icon} alt={label} />
    <p className="text-white text-sm font-medium">{label}</p>
  </div>
);

export default TableInformation;
