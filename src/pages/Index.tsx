
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LogIn, Users, BarChart3, Ticket } from 'lucide-react'

const Index = () => {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/marocpme-logo.png" alt="MarocPME" className="h-8 w-auto" />
          <span className="font-bold text-xl">Portail Agent</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button onClick={() => navigate('/login')} className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Se connecter
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Portail Agent JIRA
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Accédez à votre tableau de bord JIRA et gérez efficacement les tickets de support client avec MarocPME
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/login')} className="text-lg px-8">
              <LogIn className="mr-2 h-5 w-5" />
              Se connecter avec JIRA
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <Ticket className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Gestion des Tickets</CardTitle>
              <CardDescription>
                Accédez et gérez tous vos tickets JIRA depuis une interface simplifiée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Interface optimisée pour une gestion rapide et efficace des demandes clients
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Tableau de Bord</CardTitle>
              <CardDescription>
                Visualisez vos statistiques et suivez vos performances en temps réel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Métriques détaillées sur votre activité et vos résultats
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Profil Agent</CardTitle>
              <CardDescription>
                Accédez à vos informations personnelles synchronisées avec JIRA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Profil automatiquement mis à jour avec vos données JIRA
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Index
