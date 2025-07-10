
"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeSwitcher() {
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

  return (
    <Button variant="ghost" size="icon" onClick={cycleTheme} className="h-9 w-9">
      {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />}
      {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />}
      {theme === "system" && <Laptop className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
