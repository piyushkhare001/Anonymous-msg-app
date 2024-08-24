// import OpenAI from 'openai';
// import { OpenAIStream, StreamingTextResponse } from 'ai';
// import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo-instruct',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = OpenAIStream(response);
    
    
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       // OpenAI API error handling
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       // General error handling
//       console.error('An unexpected error occurred:', error);
//       throw error;
//     }
//   }
// }


// import { HfInference } from '@huggingface/inference';
//   import { NextRequest, NextResponse } from 'next/server';
  
//   const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
  

//   const prompt =
//   "Create a list of  open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform";

//   export async function POST(req: NextRequest) {
//     try {
//       const response = Hf.textGenerationStream({
//         model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
//         inputs: prompt,
//         parameters: {
//           max_new_tokens: 200,
//           typical_p: 0.2,
//           repetition_penalty: 1,
//           truncate: 2047,
//            return_full_text: false,
//         },
//       });
  
//       let generatedText = '';
  
//       for await (const chunk of response) {
//         if (chunk.generated_text) {
//           generatedText += chunk.generated_text;
//         }
//       }
//       return NextResponse.json({ result: generatedText });
//     } catch (error) {
//       console.error('Error while streaming data:', error);
//       return new NextResponse('Internal Server Error', { status: 500 });
//     }
//   }
// // 


import { createOpenAI } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server';


const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY ?? '',
  baseURL: 'https://api.fireworks.ai/inference/v1'
})
export async function POST(req: NextRequest) {
  try{
const {text}  = await generateText({
  model: fireworks('accounts/fireworks/models/llama-v3p1-405b-instruct'),
  prompt: "Create a list of  open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment."
})
 return NextResponse.json({ result: text });
                  
  }catch(err){
    console.log(err)
  }
}