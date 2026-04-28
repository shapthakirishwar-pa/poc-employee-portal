import { useAuth } from "@/features/auth/hooks/useAuth"
import { LayoutDashboard, LogOut, Settings, UserCircle, Users } from "lucide-react"
import { Link, useLocation } from "react-router"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useMemo, type ElementType } from "react"

interface NavItem {
  title: string,
  url: string,
  icon: ElementType,
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
      title: 'User Management',
      url: '/admin/users',
      icon: Users,
      roles: ['ADMIN'] // Only admins can access this item
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
      roles: ['ADMIN', 'EMPLOYEE', 'MANAGER'] // Example roles that can access this item
    }
]

export const AppSidebar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()

  const filteredNavItems = useMemo(() => {
    return navItems.filter(item =>
      user?.role && item.roles.includes(user.role) // Check if the user's role is included in the item's roles
    )
  }, [user?.role])

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="h-16 flex items-center justify-center border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:hover:bg-transparent data-[state=open]:hover:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold text-xs">EP</span>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold uppercase tracking-tight">Employee Portal</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-3 group-data-[collapsible=icon]:hidden">
              <UserCircle className="size-8 text-muted-foreground" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate">{user?.name || 'User'}</span>
                <span className="text-xs uppercase tracking-tighter text-muted-foreground truncate">{user?.role || 'GUEST'}</span>
              </div>
            </div>
            <SidebarMenuButton
              onClick={logout}
              className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
