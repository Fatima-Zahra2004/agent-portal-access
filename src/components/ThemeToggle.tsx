
import { Moon, Sun, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative h-10 w-10 rounded-full bg-gradient-to-br from-orange-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 hover:from-orange-200 hover:to-blue-200 dark:hover:from-purple-800 dark:hover:to-blue-800 border-2 border-orange-200 dark:border-purple-700 transition-all duration-300 hover:scale-110"
      >
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Sun className="h-5 w-5 text-orange-600" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Moon className="h-5 w-5 text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Effet de brillance animé */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </Button>

      {/* Tooltip animé */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded-md whitespace-nowrap shadow-lg"
          >
            {theme === "light" ? "Mode sombre" : "Mode clair"}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-b-foreground" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particules d'étoiles pour le mode sombre */}
      {theme === "dark" && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              initial={{ 
                opacity: 0, 
                x: Math.random() * 40 - 20, 
                y: Math.random() * 40 - 20,
                scale: 0
              }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 2
              }}
              style={{
                left: '50%',
                top: '50%',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
