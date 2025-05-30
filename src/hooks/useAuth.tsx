
import { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { authService } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  avatar?: string;
  jiraKey?: string;
  timezone?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est authentifié au chargement
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('jira_user');
      const storedToken = localStorage.getItem('jira_token');
      
      if (storedUser && storedToken) {
        // Vérifier si le token est toujours valide via Express.js
        const result = await authService.verifyToken(storedToken);

        if (!result.success) {
          // Token expiré ou invalide, nettoyer le storage
          authService.logout();
          setUser(null);
          setIsLoading(false);
          return false;
        }

        setUser(JSON.parse(storedUser));
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Erreur lors de la vérification d\'auth:', error);
    }
    
    setIsLoading(false);
    return false;
  };

  const login = async (token: string) => {
    setIsLoading(true);
    try {
      console.log('Tentative de connexion avec JIRA via Express.js...');
      
      // Vérifier le token via votre backend Express.js
      const result = await authService.verifyToken(token);

      if (!result.success) {
        throw new Error(result.error || 'Token PAT invalide');
      }

      // Stocker les informations utilisateur et le token
      setUser(result.user);
      localStorage.setItem('jira_user', JSON.stringify(result.user));
      localStorage.setItem('jira_token', token);

      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${result.user.name}`,
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      toast({
        variant: "destructive",
        title: "Échec de connexion",
        description: error.message || "Token PAT invalide ou problème de connexion à JIRA",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      authService.logout();
      
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté avec succès",
      });
      
      navigate('/');
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
