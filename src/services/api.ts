/**
 * Service pour communiquer avec le backend Express.js
 */
import axios from 'axios';

// Créer une instance axios avec la configuration de base pour Express.js
const api = axios.create({
  baseURL: import.meta.env.VITE_EXPRESS_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jira_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service d'API pour l'authentification JIRA via Express.js
export const authService = {
  // Vérifier le token PAT et récupérer les infos utilisateur
  verifyToken: async (token: string) => {
    try {
      console.log('🔄 Vérification du token PAT via Express.js...');
      console.log('🌐 URL cible:', 'http://localhost:3000/api/me');
      
      const response = await axios.get('http://localhost:3000/api/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 secondes de timeout
      });
      
      console.log('✅ Réponse Express.js reçue:', response.data);
      
      return {
        success: true,
        user: {
          id: response.data.accountId || response.data.key,
          name: response.data.displayName,
          email: response.data.emailAddress,
          role: response.data.groups?.items?.[0]?.name || 'agent',
          department: 'Support Technique',
          phone: '+212 6 00 00 00 00',
          avatar: response.data.avatarUrls?.['48x48'],
          jiraKey: response.data.key,
          timezone: response.data.timeZone
        }
      };
    } catch (error: any) {
      console.error('❌ Erreur lors de la vérification du token:', error);
      
      let errorMessage = 'Erreur de connexion inconnue';
      
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        errorMessage = '🚫 Impossible de contacter le serveur Express.js sur localhost:3000. Vérifiez que le serveur est démarré.';
      } else if (error.response?.status === 401) {
        errorMessage = '🔑 Token PAT invalide ou expiré';
      } else if (error.response?.status === 500) {
        errorMessage = '⚠️ Erreur serveur - Vérifiez la configuration JIRA dans Express.js';
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = '🔌 Connexion refusée - Le serveur Express.js n\'est pas accessible';
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  },
  
  // Vérifier si l'utilisateur est authentifié
  isAuthenticated: () => {
    return !!localStorage.getItem('jira_token');
  },
  
  // Déconnexion
  logout: () => {
    localStorage.removeItem('jira_user');
    localStorage.removeItem('jira_token');
  }
};

// Mock des données pour les tickets (à remplacer par de vraies API JIRA plus tard)
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

// Service d'API pour les tickets JIRA
export const ticketService = {
  // Récupérer tous les tickets
  getAll: async () => {
    // Simulation API - retourne les tickets mockés au lieu d'appeler l'API réelle
    console.log('Récupération des tickets simulée');
    return mockTickets;
  },
  
  // Récupérer un ticket par ID
  getById: async (id: string) => {
    console.log(`Récupération du ticket ${id} simulée`);
    const ticket = mockTickets.find(t => t.id === id);
    if (ticket) {
      return ticket;
    } else {
      throw new Error("Ticket non trouvé");
    }
  },
  
  // Créer un nouveau ticket
  create: async (ticketData: any) => {
    console.log('Création de ticket simulée', ticketData);
    const newTicket = {
      id: `T${1000 + mockTickets.length + 1}`,
      ...ticketData,
      created_at: new Date().toISOString(),
      comments: [],
      attachments: []
    };
    return newTicket;
  },
  
  // Mettre à jour un ticket
  update: async (id: string, ticketData: any) => {
    console.log(`Mise à jour du ticket ${id} simulée`, ticketData);
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex >= 0) {
      const updatedTicket = { ...mockTickets[ticketIndex], ...ticketData };
      return updatedTicket;
    }
    throw new Error("Ticket non trouvé");
  },
  
  // Supprimer un ticket
  delete: async (id: string) => {
    console.log(`Suppression du ticket ${id} simulée`);
    const ticketIndex = mockTickets.findIndex(t => t.id === id);
    if (ticketIndex >= 0) {
      return { success: true, message: "Ticket supprimé avec succès" };
    }
    throw new Error("Ticket non trouvé");
  }
};

export default api;
