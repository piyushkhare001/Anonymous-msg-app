'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {signInSchema  } from '@/schemas/signInSchema';
import { ApiResponse } from '@/types/apiResponse';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { sign } from 'crypto';
import Credentials from 'next-auth/providers/credentials';



export default function SignInForm() {
    const [username, setUsername] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {toast} = useToast()
    const router = useRouter()

      const form = useForm({
        resolver : zodResolver(signInSchema),
        defaultValues : {
            identifier  : '',
            password : ""

        }
      })



      const onSubmit = async (data : z.infer<typeof signInSchema>)  => {
        const response = await signIn('credentials',{
             redirect: false,
             identifier : data.identifier,
             password : data.password

      })
      if (response?.error) {
        if (response.error === 'CredentialsSignin') {
          toast({
            title: 'Login Failed',
            description: 'Incorrect username or password',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: response.error,
            variant: 'destructive',
          });
        }
      }
      if(response?.url){
        router.replace("/dashboard")
      }
      }
      return(
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Welcome Back to True Feedback
            </h1>
            <p className="mb-4">Sign in to continue your secret conversations</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <Input {...field} name="email" />
                    <p className='text-muted text-gray-400 text-sm'>We will send you a verification code</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} name="password" />
                    <FormMessage />
                  </FormItem>
                )}
              />
                <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
        </div>
      </div>
    );
  }
      
      


