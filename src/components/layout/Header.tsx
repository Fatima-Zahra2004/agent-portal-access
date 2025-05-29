
import { Link, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useAuth } from '@/hooks/useAuth'
import { 
  LayoutDashboard, 
  Ticket, 
  User, 
  LogOut 
} from 'lucide-react'
import { ReactNode } from 'react'

interface HeaderProps {
  children?: ReactNode
}

export function Header({ children }: HeaderProps) {
  const location = useLocation()
  const { logout, user } = useAuth()

  const navigationItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      href: '/tickets',
      label: 'Tickets',
      icon: Ticket
    },
    {
      href: '/profile',
      label: 'Profile',
      icon: User
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/marocpme-logo.png" alt="MarocPME" className="h-8 w-auto" />
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Portail Agent
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                  isActive 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Actions utilisateur */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-muted-foreground">Bienvenue,</span>
                <span className="font-medium">{user.name}</span>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </header>
  )
}
