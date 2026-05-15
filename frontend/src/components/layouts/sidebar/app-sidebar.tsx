import { useAuth } from "@/features/auth/hooks/useAuth"
import { Boxes, LayoutDashboard, LogOut, Megaphone, NotepadText, Users, type LucideIcon } from "lucide-react"
import { Link, matchPath, useLocation } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useMemo } from "react"
import { useSidebar } from "./useSidebar"

interface NavItem {
  title: string,
  url: string,
  icon: LucideIcon,
  roles: Array<'ADMIN' | 'EMPLOYEE' | 'MANAGER'> // Define the possible roles
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    roles: ['ADMIN', 'EMPLOYEE', 'MANAGER'] // Example roles that can access this item
  },
  {
    title: 'Employees',
    url: '/employees',
    icon: Users,
    roles: ['ADMIN'] // Only admins can access this item
  },
  {
    title: 'Leaves',
    url: '/leaves',
    icon: NotepadText,
    roles: ['ADMIN', 'EMPLOYEE', 'MANAGER'] // Example roles that can access this item
  },
  {
    title: 'Announcements',
    url: '/announcements',
    icon: Megaphone,
    roles: ['ADMIN', 'EMPLOYEE', 'MANAGER'] // Example roles that can access this item
  },
  {
    title: 'Team',
    url: '/team',
    icon: Boxes,
    roles: ['ADMIN', 'EMPLOYEE', 'MANAGER'] // Example roles that can access this item
  }
]

export const AppSidebar = () => {
  const { user, logout } = useAuth()
  const { open } = useSidebar()
  const location = useLocation()

  const filteredNavItems = useMemo(() => {
    return navItems.filter(item =>
      user.role && item.roles.includes(user.role) // Check if the user's role is included in the item's roles
    )
  }, [user.role])

  return (
    <Sidebar collapsible="icon" className="border-r border-border shadow-xs text-[1.6cqh] shrink-0 pl-2">
      <SidebarHeader className="h-[8cqh] p-[3cqh] border-none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className={`px-[1.2cqh] pl-0 py-[1cqh] hover:bg-transparent ${open ? "" : "hidden"}`}
            >
              <div className="flex flex-col">
                <span className="text-[3.8cqh] font-semibold tracking-tight">
                  Enterprise Portal
                </span>
                <span className="text-[2.4cqh] text-muted-foreground">
                  HR Management System
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className={open ? "px-[3cqh] py-[6cqh]" : "p-0"}>
        <SidebarMenu className="mt-6 gap-[1cqh]">
          {filteredNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={!!matchPath({ path: item.url, end: false }, location.pathname)}
                tooltip={item.title}
                className="px-[1.5cqh] py-[3.5cqh] data-active:text-[2.8cqh] data-active:font-semibold text-[2.6cqh]"
              >
                <Link to={item.url} className="flex items-center gap-[1.5cqh]">
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className={`border-t border-border ${open ? "px-[3cqh]" : "p-0"}`}>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <div className="flex items-center gap-3 px-2 py-3 group-data-[collapsible=icon]:hidden">
              <UserCircle className="size-[5cqh] text-muted-foreground" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-[2.4cqh] font-semibold truncate">{user?.name || 'User'}</span>
                <span className="text-[1.8cqh] uppercase tracking-tighter text-muted-foreground truncate">{user?.role || 'GUEST'}</span>
              </div>
            </div> */}
            <SidebarMenuButton
              onClick={logout}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors px-[1.5cqh] py-[1.2cqh]"
            >
              <LogOut className="size-[3cqh]" />
              <span className="text-[2cqh]">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
