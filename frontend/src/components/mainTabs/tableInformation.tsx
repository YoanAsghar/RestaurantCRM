import { useState } from "react"
import { colorPalette, type Table, type TableInformationProps } from "../../types"

const TableInformation = ({ table }: TableInformationProps) => {
  return (
    <div className="h-full w-[30%]">

      <div className="h-[30%]" style={{backgroundColor: colorPalette.Navy}}>
        <div>
          <h2>{table?.id}</h2>
        </div>
      </div>

      <div className="h-[55%]" style={{backgroundColor: colorPalette.DeepTwilight}}>
      </div>

      <div className="h-[15%] bg-black">
      </div>

    </div>
  )
}

export default TableInformation
