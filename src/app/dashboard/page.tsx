"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, Book, Calendar, ListChecks, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navigation = [
  {
    label: "Chat with AI",
    icon: Home,
    href: "/dashboard/chat",
  },
  {
    label: "Scheduling",
    icon: Calendar,
    href: "/dashboard/scheduling",
  },
  {
    label: "Interest Selection",
    icon: ListChecks,
    href: "/dashboard/interests",
  },
  {
    label: "Q/A",
    icon: Upload,
    href: "/dashboard/qa",
  },
];

export default function Dashboard() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <p className="font-semibold">SCSVMV Navigator</p>
          <SidebarInput placeholder="Search..." />
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton>
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSeparator />
          <p className="text-xs text-muted-foreground px-2">
            © {new Date().getFullYear()} SCSVMV Navigator
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your personalized learning hub.
          </p>
          {/* Main content will be rendered here based on the route */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

