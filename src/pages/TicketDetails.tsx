
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTickets } from '@/hooks/useTickets';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  UserIcon, LogOut, ArrowLeft, Edit, MessageSquare, 
  CheckCircle2, Clock, AlertCircle, Calendar, Mail, 
  Phone, ArrowRight
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicket, updateTicket } = useTickets();
  const { user, logout } = useAuth();
  
  const { data: ticket, isLoading, isError } = getTicket(id as string);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTicket, setEditedTicket] = useState<any>(null);

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

  const handleStatusChange = async (newStatus: string) => {
    if (!ticket) return;
    
    try {
      await updateTicket.mutateAsync({
        id: ticket.id,
        data: { ...ticket, status: newStatus }
      });
      toast({
        title: "Statut mis à jour",
        description: `Le statut du ticket a été changé en "${newStatus}"`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
      });
    }
  };

  const handleSubmitComment = () => {
    if (!comment.trim() || !ticket) return;
    
    // Dans une implémentation réelle, cela enverrait le commentaire au backend
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été ajouté avec succès",
    });
    setComment('');
  };

  const handleEditTicket = () => {
    if (!ticket) return;
    setEditedTicket({...ticket});
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editedTicket) return;
    
    try {
      await updateTicket.mutateAsync({
        id: editedTicket.id,
        data: editedTicket
      });
      setIsEditing(false);
      toast({
        title: "Ticket mis à jour",
        description: "Les modifications ont été enregistrées avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le ticket",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTicket(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTicket((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-b-purple-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Chargement du ticket...</p>
        </div>
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center text-white">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold mb-2">Ticket introuvable</h2>
          <p className="mb-4">Le ticket que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
          </Button>
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
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Détail du ticket</h1>
              <p className="text-blue-200">Gérez les informations du ticket</p>
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

        <motion.div variants={itemVariants} className="mb-4">
          <Button variant="outline" asChild className="border-slate-600 text-blue-300 hover:text-blue-100 hover:bg-slate-700">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
            </Link>
          </Button>
        </motion.div>

        {isEditing ? (
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg shadow-xl border border-slate-700 backdrop-blur-sm mb-8 p-6">
            <h2 className="text-xl font-semibold text-blue-100 mb-4">Modifier le ticket</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="title" className="text-blue-200">Titre</Label>
                <Input 
                  id="title" 
                  name="title" 
                  value={editedTicket.title} 
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700 text-blue-100"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-blue-200">Statut</Label>
                <Select name="status" value={editedTicket.status} onValueChange={(value) => handleInputChange({
                  target: { name: 'status', value }
                } as any)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-blue-100">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="pending">En attente</SelectItem>
                    <SelectItem value="in_progress">En cours</SelectItem>
                    <SelectItem value="resolved">Résolu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority" className="text-blue-200">Priorité</Label>
                <Select name="priority" value={editedTicket.priority} onValueChange={(value) => handleInputChange({
                  target: { name: 'priority', value }
                } as any)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-blue-100">
                    <SelectValue placeholder="Sélectionner une priorité" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="low">Basse</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assigned_to" className="text-blue-200">Assigné à</Label>
                <Input 
                  id="assigned_to" 
                  name="assigned_to" 
                  value={editedTicket.assigned_to} 
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700 text-blue-100"
                />
              </div>
            </div>

            <div className="mb-6">
              <Label htmlFor="description" className="text-blue-200">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editedTicket.description}
                onChange={handleInputChange}
                rows={4}
                className="bg-slate-900 border-slate-700 text-blue-100 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label htmlFor="category" className="text-blue-200">Catégorie</Label>
                <Input 
                  id="category" 
                  name="category" 
                  value={editedTicket.category} 
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700 text-blue-100"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-blue-200">Entreprise</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={editedTicket.company} 
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700 text-blue-100"
                />
              </div>
              <div>
                <Label htmlFor="submitter_email" className="text-blue-200">Email du demandeur</Label>
                <Input 
                  id="submitter_email" 
                  name="submitter_email" 
                  value={editedTicket.submitter_email} 
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700 text-blue-100"
                />
              </div>
              <div>
                <Label htmlFor="contact_number" className="text-blue-200">Numéro de contact</Label>
                <Input 
                  id="contact_number" 
                  name="contact_number" 
                  value={editedTicket.contact_number} 
                  onChange={handleInputChange}
                  className="bg-slate-900 border-slate-700 text-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit} className="border-slate-600 text-blue-300 hover:text-blue-100 hover:bg-slate-700">
                Annuler
              </Button>
              <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
                Enregistrer les modifications
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-md overflow-hidden">
                <CardHeader className="border-b border-slate-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl text-blue-100">{ticket.title}</CardTitle>
                      <CardDescription className="text-blue-300">ID: {ticket.id} • Créé le {new Date(ticket.created_at).toLocaleDateString()}</CardDescription>
                    </div>
                    <Button variant="outline" onClick={handleEditTicket} className="border-slate-600 text-amber-400 hover:text-amber-300 hover:bg-slate-700">
                      <Edit className="mr-2 h-4 w-4" /> Modifier
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-3 mb-4">
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
                        {ticket.status === 'resolved' ? 'Résolu' : 
                         ticket.status === 'pending' ? 'En attente' : 'En cours'}
                      </Badge>
                    </div>
                    <Badge variant={
                      ticket.priority === 'high' ? 'destructive' :
                      ticket.priority === 'medium' ? 'warning' : 'outline'
                    } className={
                      ticket.priority === 'high' ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' :
                      ticket.priority === 'medium' ? 'bg-amber-900/30 text-amber-400 hover:bg-amber-900/50' : 
                      'bg-slate-700 text-blue-300 hover:bg-slate-600'
                    }>
                      Priorité: {ticket.priority === 'high' ? 'Haute' : 
                                ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </Badge>
                    <Badge className="bg-purple-900/30 text-purple-400 hover:bg-purple-900/50">
                      {ticket.category}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-medium text-blue-200 mb-2">Description</h3>
                  <p className="text-slate-300 mb-6">{ticket.description}</p>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-blue-200 mb-4 flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                      Commentaires ({ticket.comments?.length || 0})
                    </h3>
                    
                    {ticket.comments && ticket.comments.length > 0 ? (
                      <div className="space-y-4">
                        {ticket.comments.map((comment: any) => (
                          <div key={comment.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-medium text-blue-200">{comment.author}</div>
                              <div className="text-sm text-slate-400">
                                {new Date(comment.created_at).toLocaleDateString()} à {new Date(comment.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </div>
                            </div>
                            <p className="text-slate-300">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p>Aucun commentaire pour ce ticket</p>
                      </div>
                    )}

                    <div className="mt-6">
                      <h4 className="text-md font-medium text-blue-200 mb-2">Ajouter un commentaire</h4>
                      <Textarea 
                        placeholder="Écrivez votre commentaire ici..." 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}
                        className="bg-slate-900 border-slate-700 text-blue-100 resize-none mb-2"
                      />
                      <Button onClick={handleSubmitComment} className="bg-blue-600 hover:bg-blue-700">
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-100">Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-blue-300 mb-2">Changer le statut</h4>
                      <div className="grid grid-cols-1 gap-2">
                        <Button 
                          onClick={() => handleStatusChange('pending')} 
                          variant="outline" 
                          className={`justify-start ${ticket.status === 'pending' ? 'bg-amber-900/30 border-amber-500 text-amber-400' : 'border-slate-600 text-blue-300 hover:bg-slate-700'}`}
                        >
                          <Clock className="mr-2 h-4 w-4" /> En attente
                        </Button>
                        <Button 
                          onClick={() => handleStatusChange('in_progress')} 
                          variant="outline" 
                          className={`justify-start ${ticket.status === 'in_progress' ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'border-slate-600 text-blue-300 hover:bg-slate-700'}`}
                        >
                          <ArrowRight className="mr-2 h-4 w-4" /> En cours
                        </Button>
                        <Button 
                          onClick={() => handleStatusChange('resolved')} 
                          variant="outline" 
                          className={`justify-start ${ticket.status === 'resolved' ? 'bg-green-900/30 border-green-500 text-green-400' : 'border-slate-600 text-blue-300 hover:bg-slate-700'}`}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Résolu
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-100">Informations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-blue-300 mb-1">Assigné à</h4>
                        <p className="text-blue-100">{ticket.assigned_to}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-300 mb-1">Demandeur</h4>
                        <p className="text-blue-100">{ticket.submitter}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-300 mb-1">Entreprise</h4>
                        <p className="text-blue-100">{ticket.company}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        <div className="flex items-center text-slate-300">
                          <Mail className="h-4 w-4 mr-2 text-slate-400" /> 
                          {ticket.submitter_email}
                        </div>
                        {ticket.contact_number && (
                          <div className="flex items-center text-slate-300">
                            <Phone className="h-4 w-4 mr-2 text-slate-400" /> 
                            {ticket.contact_number}
                          </div>
                        )}
                        <div className="flex items-center text-slate-300">
                          <Calendar className="h-4 w-4 mr-2 text-slate-400" /> 
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {ticket.attachments && ticket.attachments.length > 0 && (
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg text-blue-100">Pièces jointes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {ticket.attachments.map((attachment: any, index: number) => (
                          <li key={index}>
                            <a 
                              href={attachment.url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="flex items-center text-blue-400 hover:text-blue-300 hover:underline"
                            >
                              {attachment.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TicketDetails;
