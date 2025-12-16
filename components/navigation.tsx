"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Languages, MapPin } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      label: "மொழிபெயர்ப்பு / Translator",
      icon: Languages,
      active: pathname === "/",
    },
    {
      href: "/know-my-place",
      label: "என் இடம் / Know My Place",
      icon: MapPin,
      active: pathname === "/know-my-place",
    },
  ]

  return (
    <nav className="border-b bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button variant={item.active ? "default" : "ghost"} size="sm" className="h-8 text-xs gap-2">
                  <Icon className="h-3 w-3" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
