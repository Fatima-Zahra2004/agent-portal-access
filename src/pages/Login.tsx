
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/ThemeToggle'
import { KeyRound, User } from 'lucide-react'

const Login = () => {
  const [nom, setNom] = useState('')
  const [token, setToken] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Pour la simulation, on utilise nom et token comme email et password
    await login(nom || 'agent@marocpme.ma', token || 'password')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-4">
      {/* Theme toggle en haut à droite */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <img 
                src="/marocpme-logo.png" 
                alt="MarocPME Logo" 
                className="h-16 w-auto drop-shadow-lg" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl" />
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Portail Agent
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Accédez à votre espace de gestion des tickets JIRA
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nom" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Nom d'utilisateur
              </Label>
              <Input
                id="nom"
                placeholder="Entrez votre nom"
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="token" className="text-sm font-medium flex items-center gap-2">
                <KeyRound className="h-4 w-4" />
                Token PAT JIRA
              </Label>
              <Input
                id="token"
                placeholder="Votre token d'accès personnel"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="h-11 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground">
                Généré via l'interface d'administration JIRA
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-200 shadow-lg hover:shadow-xl" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Connexion...
                </div>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Besoin d'aide ? Contactez le{' '}
              <Button variant="link" className="p-0 h-auto text-primary font-medium">
                support technique
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
