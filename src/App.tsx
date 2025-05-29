import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import { ThemeProvider } from "./providers/ThemeProvider"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"

// Pages
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import TicketDetails from "./pages/TicketDetails"
import Profile from "./pages/Profile"
import Tickets from "./pages/Tickets"

const queryClient = new QueryClient()

// Composant pour le routage
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Routes accessibles directement */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/tickets/:id" element={<TicketDetails />} />
      <Route path="/profile" element={<Profile />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
