"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0.5 bg-black rounded-full flex items-center justify-center">
              <span className="text-2xl">₿</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
              CryptoTracker
            </h1>
            <p className="text-xs text-white/70">Real-time cryptocurrency prices</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="border-white/20 bg-black/30 hover:bg-white/10"
        >
          <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-300" />
          <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-300" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
