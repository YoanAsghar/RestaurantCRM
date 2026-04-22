import { colorPalette} from "../../types"
import TableCards from "../TableCards"
import { Table } from "../../models/table";

interface TableContentPrompts{
  tables: Table[];
  onSelect: (id: number) => void;
  onAddTable: () => void;
  onRemoveTable: () => void;
}

const TablesContent = ({tables, onSelect, onAddTable, onRemoveTable}: TableContentPrompts) => {
  return (
      <div className="h-full w-[70%] flex flex-col overflow-y-auto" style={{ backgroundColor: colorPalette.Charcoal }}>
        <div className="flex justify-between p-6 items-center">
          <h2 className="text-gray-400 m-0">Estado de las mesas: </h2>
        <div className="flex flex-row">
          <button onClick={onAddTable} className="bg-green-600 hover:bg-green-700 p-2 m-5 flex flex-row justify-center rounded-lg items-center cursor-pointer">
            <img className="size-7"  src="./plus.png" alt="" />
          </button>
          <button onClick={onRemoveTable} className="bg-red-600 hover:bg-red-700 p-2 m-5 flex flex-row justify-center rounded-lg items-center cursor-pointer">
            <img className="size-7" src="/trash_icon.png" alt="Eliminar" />
          </button>
        </div>
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
