import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "@/components/sidebar-nav"
import { Top } from "@/components/top"

const sidebarNavItems = [
  {
    title: "Lost Complain",
    href: "/dashboard/lostcomplain",
  },
  {
    title: "Found Complian",
    href: "/owner/editsuborg",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
    <Top />
      <div className="hidden space-y-6 p-10 pb-16 md:block max-md:block">
        <div className="space-y-0.5">
          <h2 className="text-4xl font-bold tracking-tight">File a complian</h2>
          <p className="text-muted-foreground text-xl">
            Secured on Blockchain
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav className=" ext-xl" items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}