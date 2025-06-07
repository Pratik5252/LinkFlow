import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/AppSidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarInset> */}
      <main className="w-full h-fit">
        <Navbar />
        <Outlet />
      </main>
      {/* </SidebarInset> */}
    </SidebarProvider>
  );
}
