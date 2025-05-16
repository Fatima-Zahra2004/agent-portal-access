
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Cette fonction simule la mise à jour du profil
    // Dans une implémentation réelle, vous appelleriez votre API Laravel
    setTimeout(() => {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
      });
    }, 500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/dashboard')} 
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
      </Button>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Mon Profil</CardTitle>
            <CardDescription>Consultez et modifiez vos informations personnelles</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                  <p className="text-sm text-gray-500">L'email ne peut pas être modifié</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Département</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full">Mettre à jour le profil</Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>Annuler</Button>
            <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              Changer le mot de passe
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
