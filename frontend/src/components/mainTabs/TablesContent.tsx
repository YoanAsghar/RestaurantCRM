import { colorPalette, type TableContentPrompts} from "../../types"
import TableCards from "../TableCards"

const TablesContent = ({tables, onSelect}: TableContentPrompts) => {
  return (
      <div className="h-full w-[70%] flex flex-col overflow-y-auto" style={{ backgroundColor: colorPalette.Charcoal }}>
        <div className="flex justify-between p-6 items-center">
          <h2 className="text-gray-400 m-0">Estado de las mesas: </h2>
            <button className="bg-green-600 p-2 m-5 flex flex-row justify-center border-4 border-green-800 rounded-lg items-center cursor-pointer">
              <img className="size-7"  src="./plus.png" alt="" />
            </button>
          </div>
        <div className="grid w-full p-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
          {tables.map((table) => (
          <TableCards key={table.id} table={table} onSelect={onSelect}/>
          ))}
        </div>
      </div>
  )
}

export default TablesContent
