import { useState } from "react";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);

  return (
    <div>
      <Sidebar username={"BussinesName"}/>
    </div>
  )
}

export default App
