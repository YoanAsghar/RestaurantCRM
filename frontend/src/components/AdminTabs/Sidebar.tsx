import { useState } from "react";


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);

  return (
    <aside
      className={`h-screen ${isCollapsed ? "w-40" : "w-12"} bg-white border-r border-gray-200 shadow-sm flex flex-col transition-all duration-300`}
    >
      {/* Menú */}
      <nav className="flex-1 py-2">
        <ul className="space-y-0.5">
          <li  className={`cursor-pointer flex flex-row items-center hover:bg-white hover:invert px-3 py-3 rounded-lg cursor-pointer${selectedTab === 1 ? "bg-purple-950" : ""}`}>
            <img className="size-6" src="/inventory.png" alt="" />
            <p className="pl-3">
              Gestionar productos
            </p>
          </li>
          <li  className={`cursor-pointer flex flex-row items-center hover:bg-white hover:invert px-3 py-3 rounded-lg cursor-pointer${selectedTab === 1 ? "bg-purple-950" : ""}`}>
            <img className="size-6" src="/home_icon.png" alt="" />
            <p className="pl-3">
              Gestionar empleados
            </p>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
