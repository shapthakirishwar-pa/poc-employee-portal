import { Skeleton } from "../ui/skeleton"


function PageContentLoader({count = 6}: { count?: number }) {
    return (
        <div className="flex flex-col gap-[2cqh]">
            <Skeleton className="h-[2cqh] w-[25cqw] max-w-[40cqw] bg-accent-foreground/10" />
            <div className="grid gap-[2cqh] grid-cols-[repeat(auto-fit,minmax(22cqw,1fr))]">
                {Array.from({ length: count }).map((_, idx) => (
                    <Skeleton key={idx} className="h-[14cqh] w-full rounded-[1.5cqh] bg-accent-foreground/10" />
                ))}
            </div>
        </div>
    )
}

export default PageContentLoader
