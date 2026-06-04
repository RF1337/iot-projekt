"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ChartLine,
  Bell,
  Cpu,
  Settings,
  CircleHelp,
  Home,
  HouseWifi,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const mainSections = [
  { title: "Dashboard", slug: "dashboard", icon: LayoutDashboard },
  { title: "Historik",  slug: "history",   icon: ChartLine },
  { title: "Alarmer",   slug: "alerts",    icon: Bell },
  { title: "Enheder",   slug: "devices",   icon: Cpu },
]

const bottomSections = [
  { title: "Hjælp",         href: "/help",     icon: CircleHelp },
  { title: "Indstillinger", href: "/settings", icon: Settings },
]

function SidebarLogo() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  return (
    <div className="flex h-10 items-center gap-2 overflow-hidden text-sidebar-foreground">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <HouseWifi className="h-4 w-4" />
      </span>
      {!collapsed && <span className="whitespace-nowrap text-lg font-bold">IoT Projekt</span>}
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()

  const locationId = pathname.match(/^\/locations\/([^/]+)/)?.[1]
  const onLocationsRoot = pathname === "/locations"

  const makeUrl = (slug: string) =>
    locationId ? `/locations/${locationId}/${slug}` : "#"

  const isActive = (slug: string) =>
    !!locationId && pathname === `/locations/${locationId}/${slug}`

  return (
    <Sidebar collapsible="offcanvas" className="[border-color:var(--sidebar)]">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-4 group-data-[collapsible=icon]:px-2">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Home */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  isActive={onLocationsRoot}
                  tooltip="Hjem"
                  className={`rounded-lg transition-colors duration-150 ${
                    onLocationsRoot
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Link href="/locations">
                    <Home className="h-5 w-5 shrink-0" />
                    <span className="text-base group-data-[collapsible=icon]:hidden">Hjem</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Location-scoped items */}
              {mainSections.map((item) => {
                const disabled = !locationId
                const active = isActive(item.slug)

                return (
                  <SidebarMenuItem key={item.title}>
                    {disabled ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {/* Outer span keeps pointer events so tooltip fires */}
                          <span className="w-full">
                            <SidebarMenuButton
                              size="lg"
                              className="pointer-events-none w-full cursor-not-allowed rounded-lg opacity-40"
                              tabIndex={-1}
                              aria-disabled="true"
                            >
                              <item.icon className="h-5 w-5 shrink-0" />
                              <span className="text-base group-data-[collapsible=icon]:hidden">{item.title}</span>
                            </SidebarMenuButton>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="text-xs">
                          Vælg en lokation for at åbne {item.title}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        size="lg"
                        isActive={active}
                        tooltip={item.title}
                        className={`rounded-lg transition-colors duration-150 ${
                          active
                            ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm hover:bg-sidebar-primary/90"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <Link href={makeUrl(item.slug)}>
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span className="text-base group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          {bottomSections.map((item) => {
            const active = pathname === item.href
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  size="lg"
                  isActive={active}
                  tooltip={item.title}
                  className={`rounded-lg transition-colors duration-150 ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold shadow-sm hover:bg-sidebar-primary/90"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="text-base group-data-[collapsible=icon]:hidden">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
