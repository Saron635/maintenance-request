import { Navbar } from "./_componenets/navbar";
import { Sidebar } from "./_componenets/sidebar";

const MainDashboardLayout = (
    { children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-60 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>

      <div className="hidden md:flex h-full w-56
       flex-col fixed inset-y-0 z-50 ml-4">
        <Sidebar />
      </div>
      <main className="md:pl-60 pt-[82px] h-full mt-2">
         {children}
      </main>
      
    </div>
  );
};

export default MainDashboardLayout;
