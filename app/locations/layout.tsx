import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-[linear-gradient(180deg,oklch(0.96_0.025_190),var(--background)_18rem)]">
        <div className="border-b border-sidebar-border bg-sidebar px-4 py-3 text-sidebar-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="rounded-lg text-sidebar-foreground transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:scale-95" />
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Skjul / vis sidebar <kbd className="ml-1 rounded bg-muted px-1 py-0.5 font-mono text-[10px] text-muted-foreground">⌘B</kbd>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex-1 p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
