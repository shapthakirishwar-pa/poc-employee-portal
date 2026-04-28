import { Suspense } from "react"
import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center gap-2 mb-4">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-md">
                <span className="text-primary-foreground font-bold text-2xl">EP</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Employee Portal
            </p>
        </div>

        <main className="bg-card text-card-foreground p-8 rounded-2xl border border-border shadow-md">
            <Suspense fallback={<div className="h-75 flex items-center justify-center">Loading...</div>}>
              <Outlet />
            </Suspense>
        </main>

        <footer className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Employee Portal. All rights reserved.
        </footer>
      </div>
    </div>
  )
}
