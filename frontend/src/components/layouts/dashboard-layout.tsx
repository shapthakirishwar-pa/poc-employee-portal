import { Outlet } from 'react-router-dom'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from './sidebar/app-sidebar'
import { Separator } from '../ui/separator'
import { TooltipProvider } from '../ui/tooltip'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Suspense, useMemo } from 'react'
import PageContentLoader from '../shared/page-content-loader'
import { Bell, CircleQuestionMark, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import AppBreadcrumbs from '../shared/app-breadcrumbs'

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
      <SidebarProvider
      >
        <div className='flex w-full text-foreground overflow-hidden'>
          <AppSidebar />

          <SidebarInset className='@container bg-accent flex flex-col h-dvh min-w-0 overflow-hidden ml-0!'>
            <header className='flex bg-card items-center gap-[2cqh] border-b border-border px-[3cqh] h-[11cqh] shrink-0 sticky top-0 z-10 shadow-xs'>
              <div className="flex items-center gap-[1cqh]">
                <div className='flex items-center justify-center size-[6cqh]'>
                  <SidebarTrigger />
                </div>
                <Separator orientation="vertical" className='h-[3cqh] m-2' />
                {/* Search */}
                <div className='relative flex items-center uppercase tracking-wide'>
                  <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                  <Input
                    placeholder='Quick search...'
                    className='pl-9 rounded-[1cqh] bg-accent w-60'
                  />
                </div>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className='flex items-center text-muted-foreground'>
                  <Button variant='ghost'>
                    <Bell className='size-[3.6cqh]' />
                  </Button>
                  <Button variant='ghost'>
                    <CircleQuestionMark className='size-[3.6cqh]' />
                  </Button>
                </div>
                <Separator orientation="vertical" className='h-auto m-2' />
                <div className='flex items-center gap-2'>
                  <div className='flex flex-col capitalize'>
                    <span className='font-bold'>{user.name}</span>
                    <span className='font-semibold text-muted-foreground'>{user.role.toLowerCase()}</span>
                  </div>
                  <span className='size-[6cqh] rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20 uppercase'>
                    {initials}
                  </span>
                </div>
              </div>
            </header>

            <main className='flex-1 flex flex-col min-h-0 bg-slate-50'>
              <div className="overflow-y-auto min-h-0 p-[4cqh]">
                <AppBreadcrumbs />
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
