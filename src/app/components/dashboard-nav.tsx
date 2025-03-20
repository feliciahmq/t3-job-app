"use client"

import { Separator } from "@/components/ui/separator"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "~/app/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, BriefcaseIcon, Calendar, FileText, Home, LogOut, Settings, User } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.refresh()
    router.replace("/")
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="py-2">
        <h2 className="px-4 text-2xl font-semibold tracking-tight">JobTracker</h2>
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href && "font-medium")}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
      <div className="mt-auto">
        <Separator className="my-4" />
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout} asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}

