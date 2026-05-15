import { Link, useMatches } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"

type BreadcrumbHandle = {
    crumb: string | ((data) => React.ReactNode);
};

function AppBreadcrumbs() {
    const matches = useMatches()
    const crumbs = matches
        .filter((match) => (match.handle as BreadcrumbHandle)?.crumb)
        .map((match) => {
            const handle = match.handle as BreadcrumbHandle

            if (!handle?.crumb) return null

            const crumb = typeof handle.crumb === "function"
                ? handle.crumb(match.loaderData)
                : handle.crumb
            
            return {
                label: crumb,
                path: match.pathname
            }
        })

    if (crumbs.length <= 1) return null
    

    return (
        <Breadcrumb className="mb-3">
            <BreadcrumbList>
                {crumbs.map((crumb, idx) => {
                    const isLast = idx === crumbs.length - 1

                    return (
                        <BreadcrumbItem>
                            {!isLast
                                ? (
                                    <>
                                        <BreadcrumbLink asChild>
                                            <Link to={crumb.path}>{crumb.label}</Link>
                                        </BreadcrumbLink>
                                        <BreadcrumbSeparator />
                                    </>
                                ) : (
                                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                                )
                            }
                        </BreadcrumbItem>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default AppBreadcrumbs
