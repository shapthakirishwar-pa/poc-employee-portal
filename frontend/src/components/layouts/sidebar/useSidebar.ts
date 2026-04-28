import { useContext } from "react";
import { SidebarContext } from "@/components/layouts/sidebar/sidebar-context";

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    console.error("Context Error: useSidebar used outside of its Provider.")
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}