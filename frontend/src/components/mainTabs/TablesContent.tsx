import { colorPalette, type TableContentPrompts } from "../../types"
import TableCards from "../TableCards"

const TablesContent = ({tables}: TableContentPrompts) => {
  return (
    <div className="w-full h-full flex flex-row items-center justify-center">
      {/*Tables section*/}
      <div className="h-full w-[70%] flex flex-col overflow-y-auto" style={{ backgroundColor: colorPalette.Charcoal }}>
        <div className="flex justify-between p-6 items-center">
          <h2 className="text-gray-400 m-0">Estado de las mesas: </h2>
            <button className="bg-green-600 p-2 flex flex-row justify-center border-4 border-green-800 rounded-lg items-center cursor-pointer">
              <img className="size-9"  src="./plus.png" alt="" />
              <p className="text-white text-lg">Agregar mesa</p>
            </button>
          </div>
        <div className="grid w-full p-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {tables.map((table) => (
          <TableCards key={table.id} tableData={table}/>
          ))}
        </div>
      </div>

      {/*Info section*/}
      <div className="h-full w-[30%]" style={{ backgroundColor: colorPalette.White }}>
      </div>
    </div>
  )
}

export default TablesContent
