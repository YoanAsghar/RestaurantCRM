import { useState } from "react";
import { BodyTabs } from "../colorPallete";

interface SideBarProps {
  username: string;
  setTabChange: (tab: BodyTabs) => void;
  currentTab: BodyTabs;
}

const Sidebar = ({username, setTabChange, currentTab} : SideBarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <aside
      className={`h-screen ${isCollapsed ? "w-40" : "w-12"} bg-white border-r border-gray-200 shadow-sm flex flex-col transition-all duration-300`}
    >
      {/* Logo / Header */}
        <div className="p-3 min-h-12">
        {isCollapsed 
          ? ( <img src="./logoipsum.png" alt="" /> )
          : ( <img className="size-6" src="./logoipsum-small.png" alt="" />)}
        </div>
      {/* Menú */}
      <nav className="flex-1 py-2">
        <ul className="space-y-0.5">
          <li onClick={() => {setTabChange(BodyTabs.mesas); setSelectedTab(1)}} className={`flex flex-row items-center hover:bg-gray-100 px-3 py-3 rounded-lg cursor-pointer ${selectedTab === 1 ? "bg-gray-100" : ""}`}>
            <img className="size-6" src="./home_icon.png" alt="" />
            {!isCollapsed 
              ? ""
              : <a href="#" className="flex items-center gap-2 px-4 text-gray-700">Mesas</a>
            }
          </li>
          <li onClick={() => {setTabChange(BodyTabs.ordenes); setSelectedTab(2)}} className={`flex flex-row items-center hover:bg-gray-100 px-3 py-3 rounded-lg cursor-pointer ${selectedTab === 2 ? "bg-gray-100 text-white" : ""}`}>
            <img className="size-6" src="./orders.png" alt="" />
            {!isCollapsed 
              ? ""
              : <a href="#" className="flex items-center gap-2 px-4 text-gray-700 ">Ordenes</a>
            }
          </li>
          <li onClick={() => {setTabChange(BodyTabs.inventario); setSelectedTab(3)}} className={`flex flex-row items-center hover:bg-gray-100 px-3 py-3 rounded-lg cursor-pointer ${selectedTab === 3 ? "bg-gray-100 text-white" : ""}`}>
            <img className="size-6" src="./inventory.png" alt="" />
            {!isCollapsed 
              ? ""
              : <a href="#" className="flex items-center gap-2 px-4 text-gray-700 ">Inventario</a>
            }
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex flex-col">
        <div className="px-3 flex flex-row items-center hover:bg-gray-100 py-3 rounded-lg">
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="flex flex-row items-center cursor-pointer">
            <img src={`${isCollapsed ? "./collapse.png" : "./expand.png"}`} alt="Cerrar sesion" className="size-6" />
            {!isCollapsed 
            ? ""
            : <p className="text-sm px-4 text-gray-500">Colapsar</p>
            }
          </button>
        </div>
        <div className="px-3 flex flex-row items-center cursor-pointer hover:bg-gray-100 py-3 rounded-lg">
          <img src="./logout.png" alt="Cerrar sesion" className="size-6" />
          {!isCollapsed 
            ? ""
            : <p className="text-sm px-4 text-gray-500">{username}</p>
            }
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

