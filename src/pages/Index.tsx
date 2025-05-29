
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Clock, User, AlertCircle, CheckCircle, Calendar } from 'lucide-react';

// Données d'exemple des tickets
const ticketsData = [
  {
    id: 'MPME-001',
    title: 'Problème de connexion à la plateforme',
    description: 'Impossible de se connecter depuis ce matin',
    status: 'Open',
    priority: 'High',
    assignee: 'Ahmed Benali',
    created: '2024-01-15',
    updated: '2024-01-15'
  },
  {
    id: 'MPME-002',
    title: 'Demande de nouveau certificat',
    description: 'Besoin d\'un certificat pour nouvelle activité',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Fatima Zahra',
    created: '2024-01-14',
    updated: '2024-01-15'
  },
  {
    id: 'MPME-003',
    title: 'Bug dans le module de facturation',
    description: 'Erreur lors de la génération des factures',
    status: 'Resolved',
    priority: 'High',
    assignee: 'Mohamed Alami',
    created: '2024-01-13',
    updated: '2024-01-15'
  },
  {
    id: 'MPME-004',
    title: 'Formation sur nouvelle fonctionnalité',
    description: 'Demande de formation pour l\'équipe',
    status: 'Open',
    priority: 'Low',
    assignee: 'Khadija Benjelloun',
    created: '2024-01-12',
    updated: '2024-01-14'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Open': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'Medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'Low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const Index = () => {
  const [loginData, setLoginData] = useState({ nom: '', token: '' });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', loginData);
    // Ici vous pouvez ajouter la logique de connexion
    setIsLoginOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header>
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="ml-4">
              Se connecter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                Connexion Agent
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom d'utilisateur</Label>
                <Input
                  id="nom"
                  type="text"
                  placeholder="Entrez votre nom"
                  value={loginData.nom}
                  onChange={(e) => setLoginData(prev => ({ ...prev, nom: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token">Token PAT JIRA</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Votre token d'accès personnel"
                  value={loginData.token}
                  onChange={(e) => setLoginData(prev => ({ ...prev, token: e.target.value }))}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Généré via l'interface d'administration JIRA
                </p>
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Header>

      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Portail Agent MarocPME
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Gestion centralisée des tickets et demandes
            </p>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Tickets</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{ticketsData.length}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">Ouverts</p>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      {ticketsData.filter(t => t.status === 'Open').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">En cours</p>
                    <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                      {ticketsData.filter(t => t.status === 'In Progress').length}
                    </p>
                  </div>
                  <User className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">Résolus</p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {ticketsData.filter(t => t.status === 'Resolved').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des tickets */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Tickets récents</h2>
            <div className="grid gap-4">
              {ticketsData.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{ticket.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">#{ticket.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{ticket.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{ticket.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Créé le {ticket.created}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
