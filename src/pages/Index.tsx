
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation pour faire apparaître les éléments progressivement
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-slate-100 dark:from-background dark:to-slate-900">
      {/* Header avec logo et profil inactif */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-primary">Portail Agent</h1>
        </div>
        
        {/* Zone de profil (inactive) */}
        <div 
          className={`p-2 rounded-full border border-gray-300 relative ${isAuthenticated ? 'bg-primary/10' : 'bg-gray-100 opacity-60 cursor-not-allowed'}`}
          title={isAuthenticated ? "Voir le profil" : "Connectez-vous pour accéder à votre profil"}
        >
          <UserRound size={24} className={`${isAuthenticated ? 'text-primary' : 'text-gray-400'}`} />
          {!isAuthenticated && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full" />
          )}
        </div>
      </header>
      
      <motion.div 
        className="container mx-auto px-4 py-12 flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Bienvenue sur votre Portail Agent</h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Gérez efficacement vos tickets et suivez l'activité de votre équipe en un seul endroit
          </p>
        </motion.div>
        
        {/* Cartes des fonctionnalités */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestion des tickets</h3>
              <p className="text-gray-600">Accédez et gérez tous vos tickets JIRA en un seul endroit</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Statistiques en temps réel</h3>
              <p className="text-gray-600">Visualisez les performances et l'état des tickets</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration d'équipe</h3>
              <p className="text-gray-600">Collaborez efficacement avec votre équipe sur les tickets</p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Bouton de connexion JIRA animé */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-xl flex items-center gap-2 group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate('/login')}
            >
              Se connecter avec JIRA
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="ml-1" />
              </motion.div>
            </Button>
          </motion.div>
          
          <p className="text-sm text-gray-500">Connectez-vous pour accéder à toutes les fonctionnalités</p>
        </motion.div>
      </motion.div>
      
      <footer className="container mx-auto py-6 px-4 text-center text-gray-500 text-sm">
        © 2025 Portail Agent - Tous droits réservés
      </footer>
    </div>
  );
};

export default Index;
