
import { MainLayout } from '@/components/layout/MainLayout'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User, Mail, Phone, Building, Clock, Key, LogOut } from 'lucide-react'

const Profile = () => {
  const { user, logout } = useAuth()

  if (!user) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Mon Profil</h1>
          <p className="text-muted-foreground">Vous devez être connecté pour voir votre profil.</p>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Mon Profil</h1>
            <p className="text-muted-foreground">Informations récupérées depuis JIRA</p>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Carte principale du profil */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <Badge variant="secondary">{user.role}</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Téléphone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Département</p>
                    <p className="font-medium">{user.department}</p>
                  </div>
                </div>

                {user.timezone && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fuseau horaire</p>
                      <p className="font-medium">{user.timezone}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Informations JIRA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Informations JIRA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">ID Utilisateur</p>
                <p className="font-mono text-sm bg-muted p-2 rounded">{user.id}</p>
              </div>
              
              {user.jiraKey && (
                <div>
                  <p className="text-sm text-muted-foreground">Clé JIRA</p>
                  <p className="font-mono text-sm bg-muted p-2 rounded">{user.jiraKey}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Ces informations sont automatiquement synchronisées avec votre compte JIRA.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques ou informations supplémentaires */}
        <Card>
          <CardHeader>
            <CardTitle>Statistiques d'activité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-primary">42</p>
                <p className="text-sm text-muted-foreground">Tickets traités</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">23</p>
                <p className="text-sm text-muted-foreground">Tickets résolus</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">15</p>
                <p className="text-sm text-muted-foreground">En cours</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">2.3j</p>
                <p className="text-sm text-muted-foreground">Temps moyen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}

export default Profile
