
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ThemeToggle } from '@/components/ThemeToggle'
import { KeyRound, AlertCircle, Server, Shield } from 'lucide-react'

const Login = () => {
  const [token, setToken] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) {
      return;
    }
    await login(token)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-6 text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img 
                  src="/marocpme-logo.png" 
                  alt="MarocPME Logo" 
                  className="h-20 w-auto drop-shadow-lg" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl" />
              </div>
            </div>
            
            <div className="space-y-3">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Authentification JIRA
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                Connectez-vous avec votre token d'accès personnel
              </CardDescription>
            </div>

            <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <Server className="h-4 w-4" />
              <span>Backend Express.js • Port 3000</span>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="token" className="text-base font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Token PAT JIRA
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="token"
                    placeholder="Entrez votre token d'accès personnel JIRA"
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    required
                    className="pl-10 h-12 text-base border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Token généré depuis votre compte JIRA personnel
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-semibold mb-2">Comment obtenir votre token PAT :</p>
                    <ol className="space-y-1 text-sm">
                      <li>1. Connectez-vous à <strong>jisr.marocpme.gov.ma</strong></li>
                      <li>2. Allez dans <strong>Paramètres → Sécurité</strong></li>
                      <li>3. Créez un <strong>Token d'Accès Personnel</strong></li>
                      <li>4. Copiez le token et collez-le ci-dessus</li>
                    </ol>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]" 
                disabled={isLoading || !token.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Vérification en cours...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Se connecter à JIRA
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ⚠️ Assurez-vous que votre{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">serveur Express.js</span>{' '}
                est démarré sur{' '}
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">localhost:3000</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
