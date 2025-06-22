import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/AppSidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import type { ToasterProps } from "sonner";
import { Toaster } from "./ui/sonner";
import { useTheme } from "next-themes";

export default function Layout() {
  const { resolvedTheme } = useTheme();
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarInset> */}
      <main className="w-full h-full">
        <Navbar />
        <Outlet />
        <Toaster richColors theme={resolvedTheme as ToasterProps["theme"]} />
      </main>
      {/* </SidebarInset> */}
    </SidebarProvider>
  );
}
