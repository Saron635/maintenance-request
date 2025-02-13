import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-gray-200 border-gray-100">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
