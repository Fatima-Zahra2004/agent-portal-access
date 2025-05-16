
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTickets } from '@/hooks/useTickets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTicket, updateTicket } = useTickets();
  const [comment, setComment] = useState('');
  
  const { data: ticket, isLoading, isError } = getTicket(id || '');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Chargement du ticket...</p>
      </div>
    );
  }
  
  if (isError || !ticket) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg text-red-600">Erreur lors du chargement du ticket</p>
        <Button onClick={() => navigate('/dashboard')}>Retour au tableau de bord</Button>
      </div>
    );
  }

  const getStatusIcon = () => {
    switch (ticket.status) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleStatusChange = (newStatus: string) => {
    updateTicket.mutate({
      id: ticket.id,
      data: { ...ticket, status: newStatus }
    });
  };

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    const updatedComments = [...(ticket.comments || []), {
      id: Date.now().toString(),
      text: comment,
      created_at: new Date().toISOString(),
      user: 'Agent'
    }];
    
    updateTicket.mutate({
      id: ticket.id,
      data: { ...ticket, comments: updatedComments }
    });
    
    setComment('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/dashboard')} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Ticket #{ticket.id}</CardTitle>
                  <CardDescription>{ticket.created_at && new Date(ticket.created_at).toLocaleDateString()}</CardDescription>
                </div>
                <div className="flex items-center">
                  {getStatusIcon()}
                  <span className="ml-2 font-medium capitalize">{ticket.status}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
              <p className="text-gray-700 mb-6">{ticket.description}</p>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Informations</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Priorité</p>
                      <p className="font-medium capitalize">{ticket.priority}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium capitalize">{ticket.type || 'Support'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Assigné à</p>
                      <p className="font-medium">{ticket.assignee || 'Non assigné'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dernière mise à jour</p>
                      <p className="font-medium">{ticket.updated_at && new Date(ticket.updated_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Commentaires</h3>
                <div className="space-y-4">
                  {ticket.comments && ticket.comments.length > 0 ? (
                    ticket.comments.map((comment: any) => (
                      <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{comment.user}</p>
                          <p className="text-sm text-gray-500">
                            {comment.created_at && new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Aucun commentaire pour le moment.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Ajouter un commentaire</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Écrivez votre commentaire ici..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-32"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleAddComment}>Soumettre</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleStatusChange('pending')}
                disabled={ticket.status === 'pending'}
              >
                <Clock className="mr-2 h-4 w-4" /> Marquer en attente
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleStatusChange('in_progress')}
                disabled={ticket.status === 'in_progress'}
              >
                <Clock className="mr-2 h-4 w-4" /> Marquer en cours
              </Button>
              <Button 
                className="w-full justify-start bg-green-600 hover:bg-green-700" 
                onClick={() => handleStatusChange('resolved')}
                disabled={ticket.status === 'resolved'}
              >
                <CheckCircle className="mr-2 h-4 w-4" /> Marquer comme résolu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
