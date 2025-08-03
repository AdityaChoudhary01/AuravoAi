
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, signUpWithEmail, signInWithEmail } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof (isLoginView ? loginSchema : signupSchema)>>({
    resolver: zodResolver(isLoginView ? loginSchema : signupSchema),
    defaultValues: {
      email: '',
      password: '',
      ...(isLoginView ? {} : { name: '' }),
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      if (isLoginView) {
        await signInWithEmail(values.email, values.password);
      } else {
        await signUpWithEmail(values.email, values.password, values.name);
      }
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLoginView ? 'Login' : 'Sign Up'}</DialogTitle>
          <DialogDescription>
            {isLoginView ? 'Access your account' : 'Create an account to continue'}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button variant="outline" onClick={handleGoogleSignIn} disabled={isLoading}>
            {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
            Sign in with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isLoginView && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoginView ? 'Login' : 'Sign Up'}
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-4 text-center text-sm">
          {isLoginView ? "Don't have an account?" : 'Already have an account?'}
          <Button variant="link" onClick={() => {
            setIsLoginView(!isLoginView);
            form.reset();
          }}>
            {isLoginView ? 'Sign up' : 'Login'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
