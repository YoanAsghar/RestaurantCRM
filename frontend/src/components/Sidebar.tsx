import { useState } from "react";
import { BodyTabs } from "../colorPallete";

interface SideBarProps {
  username: string;
  setTabChange: (tab: BodyTabs) => void;
  currentTab: BodyTabs;
}

const Sidebar = ({username, setTabChange, currentTab} : SideBarProps) => {
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <nav
      className={`h-15 bg-[#22007c] border-r shadow-sm flex flex-row transition-all duration-300 items-center`}
    >
      {/* Logo / Header */}
      <div className="p-3 min-h-12">
        <img className="w-40" src="/logoipsum.png" alt="" />
      </div>
      {/* Menú */}
      <nav className="flex-1 py-2 pl-10">
        <ul className="space-y-0.5 flex flex-row">
          <li
            onClick={() => {
              setTabChange(BodyTabs.mesas);
              setSelectedTab(1);
            }}
            className={`flex flex-row items-center hover:bg-black hover:invert px-3 py-3 w-40 rounded-lg cursor-pointer ${selectedTab === 1 ? "bg-black invert" : ""}`}
          >
            <img className="size-6 invert" src="/home_icon.png" alt="" />
            <a href="#" className="flex items-center gap-2 px-4 text-white">
              Mesas
            </a>
          </li>
          <li
            onClick={() => {
              setTabChange(BodyTabs.ordenes);
              setSelectedTab(2);
            }}
            className={`flex flex-row items-center hover:bg-black hover:invert px-3 py-3 w-40 rounded-lg cursor-pointer ${selectedTab === 2 ? "bg-black invert" : ""}`}
          >
            <img className="size-6 invert" src="/orders.png" alt="" />
              <a
                href="#"
                className="flex items-center gap-2 px-4 text-white "
              >
                Ordenes
              </a>
          </li>
          <li
            onClick={() => {
              setTabChange(BodyTabs.inventario);
              setSelectedTab(3);
            }}
            className={`flex flex-row items-center hover:bg-black hover:invert px-3 py-3 w-40 rounded-lg cursor-pointer ${selectedTab === 3 ? "bg-black invert" : ""}`}
          >
            <img className="size-6 invert" src="/inventory.png" alt="" />
              <a
                href="#"
                className="flex items-center gap-2 px-4 text-white"
              >
                Inventario
              </a>
          </li>
          <li
            onClick={() => {
              setTabChange(BodyTabs.admin);
              setSelectedTab(4);
            }}
            className={`flex flex-row items-center hover:bg-black hover:invert px-3 py-3 w-40 rounded-lg cursor-pointer ${selectedTab === 4 ? "bg-black invert" : ""}`}
          >
            <img className="size-6 invert" src="/admin.png" alt="" />
              <a
                href="#"
                className="flex items-center gap-2 px-4 text-white"
              >
                Admin
              </a>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="flex flex-row">
        <div className="px-3 flex flex-row items-center cursor-pointer py-3 rounded-lg hover:bg-black hover:invert">
          <img src="/logout.png" alt="Cerrar sesion" className="size-6 invert" />
            <p className="text-sm px-4 text-white">{username}</p>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

