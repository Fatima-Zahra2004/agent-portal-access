
/**
 * Service pour communiquer avec le backend Laravel externe
 */
import axios from 'axios';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: import.meta.env.VITE_LARAVEL_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Mock des données pour simuler l'API
const mockTickets = [
  {
    id: "T1001",
    title: "Problème d'accès à la plateforme de subventions",
    description: "Un entrepreneur ne parvient pas à accéder au formulaire de demande de subvention pour son projet d'expansion. Il reçoit une erreur 403 après l'authentification.",
    status: "pending",
    priority: "high",
    created_at: "2025-05-15T10:30:00",
    assigned_to: "Ahmed Alaoui",
    submitter: "Omar Benjelloun",
    submitter_email: "omar.b@example.ma",
    company: "TechMaroc SARL",
    contact_number: "0661234567",
    category: "Accès technique",
    attachments: [],
    comments: [
      {
        id: "C1",
        content: "J'ai vérifié les journaux d'accès, l'utilisateur est bien enregistré mais ses permissions semblent incorrectes.",
        author: "Ahmed Alaoui",
        created_at: "2025-05-15T14:22:00"
      }
    ]
  },
  {
    id: "T1002",
    title: "Demande d'information sur le programme d'accompagnement",
    description: "Une entreprise souhaite avoir plus de détails sur le programme d'accompagnement pour les startups orientées export. Ils veulent savoir si leur secteur (agroalimentaire) est éligible.",
    status: "resolved",
    priority: "medium",
    created_at: "2025-05-14T09:15:00",
    assigned_to: "Fatima Zahra",
    submitter: "Karim El Mansouri",
    submitter_email: "karim@agrofresh.ma",
    company: "AgroFresh",
    contact_number: "0522987654",
    category: "Programmes d'accompagnement",
    attachments: [],
    comments: [
      {
        id: "C2",
        content: "J'ai envoyé la brochure détaillée et confirmé l'éligibilité de leur projet.",
        author: "Fatima Zahra",
        created_at: "2025-05-14T11:30:00"
      },
      {
        id: "C3",
        content: "Le client a confirmé sa compréhension et va soumettre son dossier cette semaine.",
        author: "Fatima Zahra",
        created_at: "2025-05-14T15:45:00"
      }
    ]
  },
  {
    id: "T1003",
    title: "Bug dans le calculateur de financement",
    description: "Le calculateur de financement sur le site affiche des montants incorrects pour les projets dépassant 2 millions de dirhams. Les pourcentages semblent inversés.",
    status: "in_progress",
    priority: "high",
    created_at: "2025-05-16T08:45:00",
    assigned_to: "Youssef Ben Ali",
    submitter: "Salma Kabbaj",
    submitter_email: "s.kabbaj@fintech.ma",
    company: "FinTech Solutions",
    contact_number: "0667891234",
    category: "Bug technique",
    attachments: [{
      name: "screenshot.jpg",
      url: "https://example.com/files/screenshot.jpg"
    }],
    comments: []
  },
  {
    id: "T1004",
    title: "Demande de prolongation de délai",
    description: "Une PME demande une prolongation du délai de soumission pour l'appel à projets 'Innovation Durable' en raison de difficultés techniques rencontrées lors de la préparation du dossier.",
    status: "pending",
    priority: "medium",
    created_at: "2025-05-17T14:20:00",
    assigned_to: "Nadia El Fassi",
    submitter: "Hamid Bouchta",
    submitter_email: "h.bouchta@ecodesign.ma",
    company: "EcoDesign Maroc",
    contact_number: "0537456789",
    category: "Demande administrative",
    attachments: [{
      name: "justificatif.pdf",
      url: "https://example.com/files/justificatif.pdf"
    }],
    comments: []
  },
  {
    id: "T1005",
    title: "Problème de versement de subvention",
    description: "Une entreprise signale n'avoir pas reçu le deuxième versement de sa subvention accordée dans le cadre du programme 'Export Boost'. Tous les documents ont été fournis il y a trois semaines.",
    status: "in_progress",
    priority: "high",
    created_at: "2025-05-13T11:10:00",
    assigned_to: "Mohamed Chraibi",
    submitter: "Layla Bennani",
    submitter_email: "layla@exportex.ma",
    company: "ExporTex",
    contact_number: "0520123456",
    category: "Finance",
    attachments: [],
    comments: [
      {
        id: "C4",
        content: "J'ai contacté le service financier pour vérifier le statut du versement.",
        author: "Mohamed Chraibi",
        created_at: "2025-05-13T15:30:00"
      },
      {
        id: "C5",
        content: "Le service financier confirme que le virement est en cours de traitement et devrait être effectif d'ici 48 heures.",
        author: "Mohamed Chraibi",
        created_at: "2025-05-14T09:20:00"
      }
    ]
  },
  {
    id: "T1006",
    title: "Demande de partenariat avec MarocPME",
    description: "Une association professionnelle souhaite établir un partenariat pour organiser des ateliers de formation à destination des PME du secteur textile.",
    status: "pending",
    priority: "low",
    created_at: "2025-05-18T10:05:00",
    assigned_to: "Amina Tazi",
    submitter: "Rachid Idrissi",
    submitter_email: "contact@textilemaroc.org",
    company: "Association TextileMaroc",
    contact_number: "0522345678",
    category: "Partenariat",
    attachments: [{
      name: "presentation.pdf",
      url: "https://example.com/files/presentation.pdf"
    }],
    comments: []
  }
];

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service d'API pour les tickets JIRA
export const ticketService = {
  // Récupérer tous les tickets
  getAll: async () => {
    // Simulation API - retourne les tickets mockés au lieu d'appeler l'API réelle
    console.log('Récupération des tickets simulée');
    return mockTickets;
    
    /* Version API réelle commentée
    try {
      const response = await api.get('/tickets');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets:', error);
      throw error;
    }
    */
  },
  
  // Récupérer un ticket par ID
  getById: async (id: string) => {
    // Simulation API
    console.log(`Récupération du ticket ${id} simulée`);
    const ticket = mockTickets.find(t => t.id === id);
    if (ticket) {
      return ticket;
    } else {
      throw new Error("Ticket non trouvé");
    }
    
    /* Version API réelle commentée
    try {
      const response = await api.get(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du ticket ${id}:`, error);
      throw error;
    }
    */
  },
  
  // Créer un nouveau ticket
  create: async (ticketData: any) => {
    // Simulation API
    console.log('Création de ticket simulée', ticketData);
    const newTicket = {
      id: `T${1000 + mockTickets.length + 1}`,
      ...ticketData,
      created_at: new Date().toISOString(),
      comments: [],
      attachments: []
    };
    // Normalement on ajouterait à mockTickets, mais c'est une constante
    // Dans un cas réel, cela serait géré par la persistance du backend
    return newTicket;
    
    /* Version API réelle commentée
    try {
      const response = await api.post('/tickets', ticketData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
      throw error;
    }
    */
  },
  
  // Mettre à jour un ticket
  update: async (id: string, ticketData: any) => {
    // Simulation API
    console.log(`Mise à jour du ticket ${id} simulée`, ticketData);
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex >= 0) {
      const updatedTicket = { ...mockTickets[ticketIndex], ...ticketData };
      // Dans un cas réel, mockTickets[ticketIndex] = updatedTicket;
      return updatedTicket;
    }
    throw new Error("Ticket non trouvé");
    
    /* Version API réelle commentée
    try {
      const response = await api.put(`/tickets/${id}`, ticketData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du ticket ${id}:`, error);
      throw error;
    }
    */
  },
  
  // Supprimer un ticket
  delete: async (id: string) => {
    // Simulation API
    console.log(`Suppression du ticket ${id} simulée`);
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex >= 0) {
      // Dans un cas réel, mockTickets.splice(ticketIndex, 1);
      return { success: true, message: "Ticket supprimé avec succès" };
    }
    throw new Error("Ticket non trouvé");
    
    /* Version API réelle commentée
    try {
      const response = await api.delete(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du ticket ${id}:`, error);
      throw error;
    }
    */
  }
};

// Service d'API pour l'authentification
export const authService = {
  // Connexion utilisateur - simulation
  login: async (credentials: { email: string; password: string }) => {
    // Simulation d'une authentification réussie
    console.log('Connexion simulée avec', credentials);
    if (credentials.email === "agent@marocpme.ma" && credentials.password === "password") {
      const userData = {
        user: {
          id: "1",
          name: "Agent MarocPME",
          email: credentials.email,
          role: "agent",
          phone: "0600000000",
          department: "Support Technique"
        },
        token: "fake-jwt-token-for-simulation"
      };
      localStorage.setItem('auth_token', userData.token);
      return userData;
    }
    throw new Error("Identifiants invalides");
    
    /* Version API réelle commentée
    try {
      const response = await api.post('/login', credentials);
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
    */
  },
  
  // Déconnexion - simulation
  logout: async () => {
    console.log('Déconnexion simulée');
    localStorage.removeItem('auth_token');
    
    /* Version API réelle commentée
    try {
      await api.post('/logout');
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Supprimer le token même en cas d'erreur
      localStorage.removeItem('auth_token');
      throw error;
    }
    */
  },
  
  // Vérifier si l'utilisateur est authentifié
  isAuthenticated: () => {
    // Pour notre simulation, on retourne toujours true
    return true;
    
    /* Version API réelle commentée
    return !!localStorage.getItem('auth_token');
    */
  },
  
  // Récupérer le profil de l'utilisateur - simulation
  getUserProfile: async () => {
    // Simulation du profil utilisateur
    console.log('Récupération du profil simulée');
    return {
      id: "1",
      name: "Agent MarocPME",
      email: "agent@marocpme.ma",
      role: "agent",
      phone: "0600000000",
      department: "Support Technique"
    };
    
    /* Version API réelle commentée
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
    */
  }
};

export default api;
