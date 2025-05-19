
import { useEffect, useState } from 'react';
import { useTickets } from '@/hooks/useTickets';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TicketIcon, UserIcon, LogOut, PlusCircle, Search,
  FilterIcon, ArrowDownUp, Trash2, Edit, EyeIcon, 
  CheckCircle2, Clock, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { getTickets, deleteTicket } = useTickets();
  const { data: tickets, isLoading, isError, refetch } = getTickets;
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 12 }
    }
  };

  const handleDeleteTicket = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce ticket?')) {
      try {
        await deleteTicket.mutateAsync(id);
        toast({
          title: "Suppression réussie",
          description: "Le ticket a été supprimé avec succès",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de supprimer le ticket",
        });
      }
    }
  };

  const filteredTickets = tickets 
    ? tickets.filter((ticket: any) => {
        if (filter !== 'all' && ticket.status !== filter) return false;
        return ticket.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
               ticket.description?.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  const sortedTickets = [...filteredTickets].sort((a: any, b: any) => {
    if (sortOrder === 'newest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    } else if (sortOrder === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-purple-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Chargement des tickets...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Erreur lors du chargement des tickets</p>
          <Button onClick={() => refetch()} className="bg-blue-600 hover:bg-blue-700">Réessayer</Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.header className="flex flex-wrap justify-between items-center mb-8 gap-4" variants={itemVariants}>
          <div className="flex items-center gap-4">
            <img src="/marocpme-logo.png" alt="MarocPME Logo" className="h-10" />
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Tableau de Bord</h1>
              <p className="text-blue-200">Bienvenue, {user?.name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild className="border-slate-600 text-blue-300 hover:text-blue-100 hover:bg-slate-700">
              <Link to="/profile">
                <UserIcon className="mr-2 h-4 w-4" /> Profil
              </Link>
            </Button>
            <Button variant="outline" onClick={logout} className="border-slate-600 text-blue-300 hover:text-blue-100 hover:bg-slate-700">
              <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            </Button>
          </div>
        </motion.header>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" variants={itemVariants}>
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-100">Total des tickets</CardTitle>
              <CardDescription className="text-blue-300">Tous vos tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{tickets?.length || 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-100">En attente</CardTitle>
              <CardDescription className="text-blue-300">Tickets nécessitant une action</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-amber-400">
                {tickets?.filter((ticket: any) => ticket.status === 'pending')?.length || 0}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-100">Résolus</CardTitle>
              <CardDescription className="text-blue-300">Tickets complétés</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-400">
                {tickets?.filter((ticket: any) => ticket.status === 'resolved')?.length || 0}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg shadow-xl border border-slate-700 backdrop-blur-sm mb-8"
        >
          <div className="p-4 border-b border-slate-700 flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-xl font-semibold text-blue-100">Mes tickets</h2>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Nouveau ticket
            </Button>
          </div>
          
          <div className="p-4 border-b border-slate-700 flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Rechercher un ticket..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-slate-900 border-slate-700 text-blue-100 placeholder:text-slate-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-blue-100">
                    <FilterIcon className="h-4 w-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">Tous les tickets</SelectItem>
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="resolved">Résolus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-blue-100">
                    <ArrowDownUp className="h-4 w-4 mr-2 text-slate-400" />
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="newest">Plus récent</SelectItem>
                    <SelectItem value="oldest">Plus ancien</SelectItem>
                    <SelectItem value="priority">Priorité</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Titre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Priorité</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-blue-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {sortedTickets.length > 0 ? (
                  sortedTickets.map((ticket: any) => (
                    <motion.tr
                      key={ticket.id}
                      className="hover:bg-slate-800/70 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", damping: 12 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{ticket.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-100">{ticket.title}</div>
                        <div className="text-sm text-slate-400 truncate max-w-xs">{ticket.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(ticket.status)}
                          <Badge variant={
                            ticket.status === 'resolved' ? 'success' :
                            ticket.status === 'pending' ? 'warning' : 'default'
                          } className={
                            ticket.status === 'resolved' ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' :
                            ticket.status === 'pending' ? 'bg-amber-900/30 text-amber-400 hover:bg-amber-900/50' : 
                            'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50'
                          }>
                            {ticket.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={
                          ticket.priority === 'high' ? 'destructive' :
                          ticket.priority === 'medium' ? 'warning' : 'outline'
                        } className={
                          ticket.priority === 'high' ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' :
                          ticket.priority === 'medium' ? 'bg-amber-900/30 text-amber-400 hover:bg-amber-900/50' : 
                          'bg-slate-700 text-blue-300 hover:bg-slate-600'
                        }>
                          {ticket.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-700" asChild>
                            <Link to={`/tickets/${ticket.id}`}>
                              <EyeIcon className="h-4 w-4 text-blue-400" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-slate-700" asChild>
                            <Link to={`/tickets/edit/${ticket.id}`}>
                              <Edit className="h-4 w-4 text-amber-400" />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 border-slate-700" 
                            onClick={() => handleDeleteTicket(ticket.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                      {searchTerm || filter !== 'all' ? (
                        <div className="flex flex-col items-center">
                          <Search className="h-10 w-10 mb-3 text-slate-500" />
                          <p>Aucun ticket ne correspond à votre recherche</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <TicketIcon className="h-10 w-10 mb-3 text-slate-500" />
                          <p>Aucun ticket trouvé</p>
                          <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                            <PlusCircle className="mr-2 h-4 w-4" /> Créer votre premier ticket
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
