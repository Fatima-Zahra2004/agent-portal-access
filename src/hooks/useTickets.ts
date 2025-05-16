
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ticketService } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

export function useTickets() {
  const queryClient = useQueryClient();

  // Récupérer tous les tickets
  const getTickets = useQuery({
    queryKey: ['tickets'],
    queryFn: ticketService.getAll,
  });

  // Récupérer un ticket spécifique
  const getTicket = (id: string) => useQuery({
    queryKey: ['tickets', id],
    queryFn: () => ticketService.getById(id),
    enabled: !!id,
  });

  // Créer un ticket
  const createTicket = useMutation({
    mutationFn: (newTicket: any) => ticketService.create(newTicket),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast({
        title: "Ticket créé",
        description: "Le ticket a été créé avec succès",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le ticket",
      });
      console.error('Erreur de création:', error);
    }
  });

  // Mettre à jour un ticket
  const updateTicket = useMutation({
    mutationFn: ({id, data}: {id: string, data: any}) => ticketService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      queryClient.invalidateQueries({ queryKey: ['tickets', variables.id] });
      toast({
        title: "Ticket mis à jour",
        description: "Le ticket a été mis à jour avec succès",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le ticket",
      });
      console.error('Erreur de mise à jour:', error);
    }
  });

  // Supprimer un ticket
  const deleteTicket = useMutation({
    mutationFn: (id: string) => ticketService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      toast({
        title: "Ticket supprimé",
        description: "Le ticket a été supprimé avec succès",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le ticket",
      });
      console.error('Erreur de suppression:', error);
    }
  });

  return {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
  };
}
