import { createContext } from "react";
import type { SidebarContextProps } from "@/types/sidebar";

export const SidebarContext = createContext<SidebarContextProps | null>(null)