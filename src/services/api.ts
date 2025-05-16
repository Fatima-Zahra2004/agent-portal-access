
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
    try {
      const response = await api.get('/tickets');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tickets:', error);
      throw error;
    }
  },
  
  // Récupérer un ticket par ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du ticket ${id}:`, error);
      throw error;
    }
  },
  
  // Créer un nouveau ticket
  create: async (ticketData: any) => {
    try {
      const response = await api.post('/tickets', ticketData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
      throw error;
    }
  },
  
  // Mettre à jour un ticket
  update: async (id: string, ticketData: any) => {
    try {
      const response = await api.put(`/tickets/${id}`, ticketData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du ticket ${id}:`, error);
      throw error;
    }
  },
  
  // Supprimer un ticket
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/tickets/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du ticket ${id}:`, error);
      throw error;
    }
  }
};

// Service d'API pour l'authentification
export const authService = {
  // Connexion utilisateur
  login: async (credentials: { email: string; password: string }) => {
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
  },
  
  // Déconnexion
  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Supprimer le token même en cas d'erreur
      localStorage.removeItem('auth_token');
      throw error;
    }
  },
  
  // Vérifier si l'utilisateur est authentifié
  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
  
  // Récupérer le profil de l'utilisateur
  getUserProfile: async () => {
    try {
      const response = await api.get('/user/profile');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      throw error;
    }
  }
};

export default api;
