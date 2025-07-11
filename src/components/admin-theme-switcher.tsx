
"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function AdminThemeSwitcher({ inSidebar = false }: { inSidebar?: boolean }) {
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
    return <Button variant="ghost" size="icon" disabled className="h-9 w-9" />
  }

  const CycleIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Laptop;

  if (inSidebar) {
    return (
       <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={cycleTheme}
                    className="w-full justify-center group-data-[collapsible=expanded]:justify-start group-data-[collapsible=expanded]:gap-2 group-data-[collapsible=expanded]:px-2"
                >
                    <CycleIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="group-data-[collapsible=icon]:hidden">Toggle theme</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
                Toggle theme
            </TooltipContent>
        </Tooltip>
       </TooltipProvider>
    )
  }

  return (
    <Button 
        variant="ghost"
        size="icon"
        onClick={cycleTheme} 
        aria-label="Toggle theme"
    >
      <CycleIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
    </Button>
  )
}
