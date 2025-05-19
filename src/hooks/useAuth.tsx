
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
