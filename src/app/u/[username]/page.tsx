'use client';

import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CardHeader, CardContent, Card } from '@/components/ui/card';
import { useCompletion } from 'ai/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import * as z from 'zod';
import { ApiResponse } from '@/types/apiResponse';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { messageSchema } from '@/schemas/messageSchema';

const specialChar = '||';

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

// const initialMessageString =
//   "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {


  const params = useParams<{ username: string }>();
  const username = params.username;

  // const {
  //   complete,
  //   completion,
  //   isLoading: isSuggestLoading,
  //   error,
  // } = useCompletion({
  //   api: '/api/suggest-message',
  //   initialCompletion: initialMessageString,
  
      
   

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

 const messageContent = form.watch('content');

  const handleMessageClick = (message: string) => {
    form.setValue('content', message);
  };
  const [data, setData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>('/api/send-message', {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: 'default',
      });
      form.reset({ ...form.getValues(), content: '' });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to sent message',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };


  function getRandomQuestions(text: string, numQuestions: number = 5): string[] {
    // Step 1: Split the string into an array of questions
    const questionsArray = text.split('||').map(q => q.trim()).filter(q => q.length > 0);
    const filteredQuestions = questionsArray.filter(q => /^W.*\?$/.test(q));
    // Step 2: Shuffle the array
    const shuffledArray = filteredQuestions.sort(() => 0.5 - Math.random());
    
    // Step 3: Return the first numQuestions elements
    return shuffledArray.slice(0, numQuestions);
}


// Example usage
 const questionsString = data;

 const randomQuestions = getRandomQuestions(questionsString);
// console.log(randomQuestions);


  const fetchSuggestedMessages = async () => {
    try {
      // complete('');

      const response = await fetch('/api/suggest-message', {
        method: 'POST',
      });
    
      if (response.ok) {
        const result = await response.json();
        setData(result.result);
        console.log(data)
    }  
  }catch(error){
    const axiosError = error as AxiosError<ApiResponse>;
    toast({
      title: 'Error',
      description:
        axiosError.response?.data.message ?? 'Failed to sent message',
      variant: 'destructive',
    }
    )
  }
}



  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send Anonymous Message to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <div
           
            className="my-4 mt-7 text-2xl font-bold mb-6 text-center"
          
          >
           AI Suggest Messages for you
          </div>
          <p className='text-center'>Click on any message below to select it.</p>
        </div>
        <Button onClick={fetchSuggestedMessages}>Suggest Message</Button>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 ">
            
             {
              randomQuestions.map((message, index) => (
                <button
                  key={index}
                 
                  className="mb-2 text-center border-dark-300 border p-2 rounded-md "
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </button>
              ))
            } 
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={'/sign-up'}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  )
  
}