
"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { SidebarMenuButton } from "./ui/sidebar"

export function AdminThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light")
    } else if (theme === "light") {
      setTheme("dark")
    } else {
      setTheme("system")
    }
  }

  // Until the component is mounted, we can't know the theme, so we render a placeholder.
  if (!mounted) {
    return <SidebarMenuButton disabled className="h-9 w-9" />
  }

  const CycleIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Laptop;

  return (
    <SidebarMenuButton 
        onClick={cycleTheme} 
        tooltip="Toggle theme"
    >
      <CycleIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      <span className="group-data-[collapsible=icon]:hidden">Toggle theme</span>
    </SidebarMenuButton>
  )
}
