import { HomeIcon, FileText, CreditCard, BarChart3, ChevronDown } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

// Navigation items
const navItems = [
  { title: "Home", icon: HomeIcon, url: "#", isActive: false },
  { title: "Invoices", icon: FileText, url: "#", isActive: true },
  { title: "Bills", icon: CreditCard, url: "#", isActive: false },
  { title: "Expenses", icon: CreditCard, url: "#", isActive: false },
  { title: "Reports", icon: BarChart3, url: "#", isActive: false },
]

export function DashboardSidebar() {
  return (
    <Sidebar variant="sidebar" className="bg-[linear-gradient(to_bottom,#e2e8ff,#d5ddff,#c6d4ff)] border-none">
      {/* Add padding to the SidebarHeader */}
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center justify-center rounded-md bg-white">
          <h1 className="text-xl font-bold text-gray-400 p-4">LOGO</h1>
        </div>
        <div className="mt-4 text-sm font-medium text-gray-500 text-start">Menu</div>
      </SidebarHeader>

      {/* Add padding to the SidebarContent */}
      <SidebarContent className="px-2">
        {/* Add padding to the SidebarGroup */}
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="text-gray-600 hover:bg-[#d8e0ff] data-[active=true]:bg-[#d8e0ff] data-[active=true]:text-gray-700"
                  >
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.isActive && <ChevronDown className="ml-auto h-4 w-4" />}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

