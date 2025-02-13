import { NavbarRoutes } from "./navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="mt-2 p-4 border-b border-gray-300 h-full rounded-lg flex items-center bg-slate-200 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
