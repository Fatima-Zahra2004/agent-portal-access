
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, UserRound, Wrench, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
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
  
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/10 filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
      </div>
      
      {/* Header avec logo et navigation */}
      <header className="relative z-10 container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/marocpme-logo.png" alt="MarocPME Logo" className="h-12" />
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Portail Agent
            </h1>
            <p className="text-xs text-blue-200">Maroc PME - Gestion des tickets</p>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex gap-3">
          <Button asChild variant="ghost" className="text-blue-200 hover:text-white">
            <Link to="/dashboard">
              <FileText className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
          <Button asChild variant="ghost" className="text-blue-200 hover:text-white">
            <Link to="/profile">
              <UserRound className="mr-2 h-4 w-4" /> Profil
            </Link>
          </Button>
        </div>
      </header>
      
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
            animate={{ 
              textShadow: ["0 0 8px rgba(167, 139, 250, 0.3)", "0 0 16px rgba(167, 139, 250, 0.6)", "0 0 8px rgba(167, 139, 250, 0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Bienvenue sur votre Portail Agent
          </motion.h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Gérez efficacement vos tickets et suivez l'activité de votre équipe en un seul endroit
          </p>
        </motion.div>
        
        {/* Cartes des fonctionnalités */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
          <Link to="/dashboard" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 shadow-xl shadow-purple-900/10 backdrop-blur-sm hover:shadow-purple-800/20 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-full w-fit mb-4 shadow-md shadow-blue-500/20">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Gestion des tickets</h3>
                <p className="text-blue-200 leading-relaxed">Accédez et gérez tous vos tickets JIRA en un seul endroit</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/dashboard" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 shadow-xl shadow-purple-900/10 backdrop-blur-sm hover:shadow-purple-800/20 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-purple-500 to-fuchsia-500 p-3 rounded-full w-fit mb-4 shadow-md shadow-purple-500/20">
                  <Wrench className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Statistiques en temps réel</h3>
                <p className="text-blue-200 leading-relaxed">Visualisez les performances et l'état des tickets</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/profile" className="block hover:scale-105 transition-transform duration-300">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 shadow-xl shadow-purple-900/10 backdrop-blur-sm hover:shadow-purple-800/20 transition-all duration-300 h-full">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-indigo-500 to-sky-500 p-3 rounded-full w-fit mb-4 shadow-md shadow-indigo-500/20">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Profil utilisateur</h3>
                <p className="text-blue-200 leading-relaxed">Gérez votre profil et vos préférences</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        
        {/* Bouton d'accès rapide au dashboard */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            variants={pulseVariants}
            animate="pulse"
          >
            <Button 
              size="lg" 
              className="text-lg px-10 py-7 rounded-xl flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-600/30 border-0"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              asChild
            >
              <Link to="/dashboard">
                <span className="text-white">Accéder au tableau de bord</span>
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="ml-1 text-white" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
          
          <p className="text-sm text-blue-200">Accès direct à toutes les fonctionnalités</p>
        </motion.div>
      </motion.div>
      
      <footer className="relative z-10 container mx-auto py-6 px-4 text-center text-blue-300 text-sm">
        © 2025 Portail Agent MarocPME - Tous droits réservés
      </footer>
    </div>
  );
};

export default Index;
