import { colorPalette, type TableCardProps } from "../types"

const TableCards = ({table, onSelect}: TableCardProps) => {
  const guests = table.order?.guests || 0;
  const productsTotal = table.order?.items.reduce((sum, item) => sum + item.price, 0) || 0;
  const tip = table.order?.tip || 0;
  const totalPrice = productsTotal + tip;

  return (
    <div onClick={() => onSelect(table.id)}  className="rounded-2xl w-68 flex flex-col cursor-pointer bg-black">
      <img className="rounded-t-2xl" src="./tables_image.png" alt="" />
      <h3 className="text-white p-4 pb-1">{`Mesa ${table.id}`}</h3>
      <div className="flex flex-row items-center">
        <img className="p-2 m-3 rounded-lg" style={{ backgroundColor: colorPalette.DeepTwilight }} src="/person_icon.png" alt="" />
        <div className="flex flex-col">
          <p className="text-gray-500 text-xs">Personas</p>
          <p className="text-white">{`${guests} Comensales`}</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <img className="p-2 m-3 rounded-lg" style={{ backgroundColor: colorPalette.DeepTwilight }} src="currency_icon.png" alt="" />
        <div className="flex flex-col">
          <p className="text-gray-500 text-xs">Cuenta total</p>
          <p className="text-white">{`$${totalPrice}`}</p>
        </div>
      </div>
    </div>
  )
}

export default TableCards
