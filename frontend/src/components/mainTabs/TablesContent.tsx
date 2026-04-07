import { colorPalette } from "../../types"

const TablesContent = () => {
  return (
    <div className="w-full h-full flex flex-row">
      <div className="h-full w-[65%]" style={{ backgroundColor: colorPalette.Black }}>
      </div>
      <div className="h-full w-[35%]" style={{ backgroundColor: colorPalette.White }}>
      </div>
    </div>
  )
}

export default TablesContent
