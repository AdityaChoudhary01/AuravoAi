
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { updateUserProfile } from './actions';
import { LoaderCircle } from 'lucide-react';
import { updateProfile } from 'firebase/auth';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [name, setName] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setAvatarPreview(user.photoURL || '');
    }
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><LoaderCircle className="animate-spin" /></div>;
  }

  if (!user) {
    return <div className="text-center p-8">Please log in to view your profile.</div>;
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({
            title: 'Error',
            description: 'You must be logged in to update your profile.',
            variant: 'destructive',
        });
        return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }
    
    try {
      await updateUserProfile(formData);
      // Since server actions can't reliably update the client's auth state,
      // we can optimistically update the name on the client, or just reload.
      // For simplicity and to ensure data is fresh from Firebase, we'll reload.
      toast({
        title: 'Success',
        description: 'Your profile has been updated. Refreshing the page...',
      });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarPreview} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div>
            <Label htmlFor="avatar-upload">Change Profile Picture</Label>
            <Input id="avatar-upload" type="file" onChange={handleAvatarChange} accept="image/*" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email || ''} disabled />
            <p className="text-sm text-muted-foreground">Email address cannot be changed.</p>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
}
