import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from './sidebar/app-sidebar'
import { Separator } from '../ui/separator'
import { TooltipProvider } from '../ui/tooltip'
import { Skeleton } from '../ui/skeleton'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Suspense, useMemo } from 'react'


const PageContentLoader = () => (
    <div className="space-y-6">
        <Skeleton className="h-4 w-64" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, idx) => (
                <Skeleton key={idx} className="h-32 w-full rounded-xl" />
            ))}
        </div>
    </div>
)

export const DashboardLayout = () => {
  const { user } = useAuth()

  const initials = useMemo(() => {
    const name = user?.name
    if (!name) return "??"
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
  }, [user?.name])

  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <div className='flex min-h-screen w-full bg-background text-foreground'>
          <AppSidebar />

          <SidebarInset className='flex flex-col'>
            <header className='flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background px-6 sticky top-0 z-10 shadow-sm'>
              <div className="flex items-center gap-2">
                <div className='flex items-center justify-center h-8 w-8'>
                  <SidebarTrigger className='-ml-1' />
                </div>
                <Separator orientation="vertical" className='h-4 m-2' />
                <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
                  Employee Portal
                </h2>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className='h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold border border-primary/20 uppercase'>
                  {initials}
                </div>
              </div>
            </header>

            <main className='flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-muted/20'>
            <div className='max-w-7xl mx-auto w-full animate-in fade-in duration-500'>
              <Suspense fallback={<PageContentLoader />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
