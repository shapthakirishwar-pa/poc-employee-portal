import { Building2 } from "lucide-react"
import { Suspense } from "react"
import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className="
      min-h-dvh w-full flex items-center justify-center
      bg-accent
      bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.03)_1px,transparent_0)]
      bg-size-[24px_24px]
      p-[clamp(1rem,4cqh,2.5rem)]
    ">
      <div className="@container w-full max-w-[clamp(16rem,20vw,28rem)] flex flex-col">
        <header className="flex flex-col items-center gap-[1.5cqh] mb-[4cqh]">
          <div className="h-[5cqh] aspect-square rounded-sm bg-primary flex items-center justify-center shadow-xs">
            <Building2 className="size-[60%] text-primary-foreground" />
          </div>
          <div className="text-center">
            <h1 className="text-[2.5cqh] font-semibold tracking-tight">
              Enterprise Portal
            </h1>
            <p className="text-[1.4cqh] text-muted-foreground/60 font-medium">
              Management solutions for teams
            </p>
          </div>
        </header>
        <main className="flex-1 min-h-0 flex flex-col relative bg-card text-card-foreground rounded-[1cqh] border border-border shadow-sm overflow-hidden transition-all">
          <Suspense fallback={
            <div className="text-center text-[2cqh] py-[4cqh]">Loading...</div>
          }>
            <Outlet />
          </Suspense>
        </main>
        <footer className="mt-[2cqh] px-[2cqh] shrink-0">
          <nav className="flex flex-wrap justify-center gap-x-[3cqh] gap-y-[1.2cqh] text-[1.5cqh]  text-muted-foreground/60">
            {["Privacy Policy", "Terms of Service", "Help Center"].map((item) => (
              <a
                key={item}
                className="font-medium hover:text-foreground transition-all cursor-pointer"
              >
                {item}
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  )
}
