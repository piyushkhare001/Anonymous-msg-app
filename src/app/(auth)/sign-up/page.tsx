'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';
import { ApiResponse } from '@/types/apiResponse';
import { Description } from '@radix-ui/react-toast';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';



export default function SignUpForm() {
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [debouncedValue , setValue] = useDebounceValue(username , 300)
    const {toast} = useToast()
    const router = useRouter()

      const form = useForm({
        resolver : zodResolver(signUpSchema),
        defaultValues : {
            username  : '',
            email : "",
            password : ""

        }
      })


      useEffect(() => {
         const checkUserNameUnique = async () => {
            if(debouncedValue){
                setIsCheckingUsername(true);
                setUsernameMessage(''); // Reset message

                try{
                    const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${debouncedValue}`)
                    setUsernameMessage(response.data.message);
                    
                }catch(err){
             const axiosErr = err as AxiosError<ApiResponse>
             setUsernameMessage(
                axiosErr.response?.data.message ?? 'Error checking username'
              );
                }finally {
                    setIsCheckingUsername(false);
                  }
                  
            }
         }
          
         checkUserNameUnique()
      } ,[debouncedValue])


      const onSubmit = async (data : z.infer<typeof signUpSchema>)  => {
          setIsSubmitting(true)

          try{
          const response = await axios.post('/api/sign-up' , data)
          toast({
            title : "Sucess",
            description : response.data.message 
          })
          router.replace(`/verify/${username}`)
          setIsSubmitting(false)
          }catch(err){
            console.error('Error during sign-up:', err);

            const axiosError = err as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            ('There was a problem with your sign-up. Please try again.');
            toast({
              title: 'Sign Up Failed',
              description: errorMessage,
              variant: 'destructive',
            });
      
            setIsSubmitting(false);

          }

          

      }
      return(
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Join True Feedback
            </h1>
            <p className="mb-4">Sign up to start your anonymous adventure</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value);
                      }}
                    />
                    {isCheckingUsername && <Loader2 className="animate-spin" />}
                    {!isCheckingUsername && usernameMessage && (
                      <p
                        className={`text-sm ${
                          usernameMessage === 'Username is unique'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
              <Button type="submit" className='w-full' disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p>
              Already a member?{' '}
              <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
      
      


