import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";
import Image from "next/image";

export const Sidebar = () => {
  return (
    <div
    className="m-2 rounded-lg h-full border border-gray-300 flex flex-col overflow-auto bg-slate-200  shadow-lg overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="p-6">
        <div className="ml-4 mb-4">
          <Logo />
        </div>
        

        <div className="flex flex-col w-full min-h-full  ">
          <SidebarRoutes />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;