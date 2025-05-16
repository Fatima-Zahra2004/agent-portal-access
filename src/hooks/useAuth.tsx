
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const checkAuth = async (): Promise<boolean> => {
    if (!authService.isAuthenticated()) {
      setIsLoading(false);
      return false;
    }

    try {
      const userData = await authService.getUserProfile();
      setUser(userData);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Erreur de vérification d\'authentification:', error);
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    checkAuth();
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
        description: "Vous avez été déconnecté avec succès",
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
