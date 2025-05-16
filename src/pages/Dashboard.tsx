
import { useEffect } from 'react';
import { useTickets } from '@/hooks/useTickets';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TicketIcon, UserIcon, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { getTickets } = useTickets();
  const { data: tickets, isLoading, isError } = getTickets;
  const { user, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Chargement des tickets...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Erreur lors du chargement des tickets</p>
          <Button onClick={() => getTickets.refetch()}>Réessayer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <p className="text-gray-600">Bienvenue, {user?.name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/profile">
              <UserIcon className="mr-2 h-4 w-4" /> Profil
            </Link>
          </Button>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Déconnexion
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total des tickets</CardTitle>
            <CardDescription>Tous vos tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{tickets?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>En attente</CardTitle>
            <CardDescription>Tickets nécessitant une action</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-amber-500">
              {tickets?.filter((ticket: any) => ticket.status === 'pending')?.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Résolus</CardTitle>
            <CardDescription>Tickets complétés</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-500">
              {tickets?.filter((ticket: any) => ticket.status === 'resolved')?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mes tickets</h2>
          <Button>
            <TicketIcon className="mr-2 h-4 w-4" /> Nouveau ticket
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priorité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets?.length > 0 ? (
                tickets.map((ticket: any) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${ticket.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                          ticket.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${ticket.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          ticket.priority === 'medium' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}
                      `}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/tickets/${ticket.id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Aucun ticket trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
