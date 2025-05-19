
import { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import { authService } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

// Utilisateur simulé par défaut
const defaultUser: User = {
  id: "1",
  name: "Agent MarocPME",
  email: "agent@marocpme.ma",
  role: "agent",
  phone: "0600000000",
  department: "Support Technique"
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialiser avec l'utilisateur par défaut
  const [user, setUser] = useState<User | null>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkAuth = async (): Promise<boolean> => {
    // Simule que l'utilisateur est toujours authentifié
    setIsLoading(false);
    return true;
  };

  useEffect(() => {
    // Pas besoin de vérifier l'authentification car nous simulons un utilisateur connecté
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simule une connexion réussie
      setUser(defaultUser);
      toast({
        title: "Connecté",
        description: `Bienvenue, ${defaultUser.name}`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Échec de connexion",
        description: "Email ou mot de passe incorrect",
      });
      console.error('Erreur de connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Ne déconnecte pas réellement l'utilisateur, mais simule une déconnexion
      toast({
        title: "Déconnexion simulée",
        description: "Dans cette version, l'utilisateur reste toujours connecté",
      });
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: true, // Toujours authentifié
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};

/* 
// Si vous souhaitez implémenter une authentification réelle, décommentez et adaptez ce code :

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const checkAuth = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userData = await authService.getUserProfile();
      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated()) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      toast({
        title: "Connecté",
        description: `Bienvenue, ${response.user.name}`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Échec de connexion",
        description: "Email ou mot de passe incorrect",
      });
      console.error('Erreur de connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      toast({
        title: "Déconnecté",
        description: "À bientôt!",
      });
      navigate('/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
*/
