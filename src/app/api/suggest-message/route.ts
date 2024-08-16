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



// import { openai } from '@ai-sdk/openai';
// import { streamText, convertToCoreMessages } from 'ai';
// import messages from '@/messages.json';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const prompt  = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

  
//   try{
    
//     const result = await streamText({
//       model: openai('gpt-4-turbo'),
//       prompt
//     });
    
//   return result.toDataStreamResponse();
//   }
//   catch(err){
//     return Response.json({
//       status : 401,
//       messages : "Geting error to fetch message from open ai"
//     })
//   }


 
// }




// import {OpenAIApi}  from "openai";
// import {Configuration}  from "openai";


// // Load environment variables from a .env file if needed
// require('dotenv').config();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// const handleStream = async () => {
//   try {
//     const response = await openai.createCompletionStream({
//       model: "text-davinci-003",
//       prompt: "Tell me a joke.",
//       max_tokens: 50,
//     });

//     for await (const chunk of response) {
//       console.log(chunk.choices[0].text);
//     }
//   } catch (error) {
//     console.error("Error handling stream:", error);
//   }
// };

// handleStream();
// import { OpenAI } from 'openai';
// import { NextResponse } from 'next/server';
// import { createParser } from 'eventsource-parser';

// // Initialize OpenAI with your API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = new ReadableStream({
//       async start(controller) {
//         function onParse(event : any) {
//           if (event.type === 'event') {
//             const { data } = event;
//             if (data === '[DONE]') {
//               controller.close();
//               return;
//             }
//             try {
//               const json = JSON.parse(data);
//               const text = json.choices[0].text;
//               controller.enqueue(text);
//             } catch (e) {
//               controller.error(e);
//             }
//           }
//         }

//         const parser = createParser(onParse);

//         for await (const chunk of response) {
//           const str = new TextDecoder().decode(chunk);
//           parser.feed(str);
//         }
//       }
//     });

//     return new NextResponse(stream, {
//       headers: {
//         'Content-Type': 'text/plain',
//       }
//     });
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       console.error('An unexpected error occurred:', error);
//       throw error;
//     }
//   }
// }

// import { OpenAI } from 'openai';
// import { NextResponse } from 'next/server';
// import { createParser } from 'eventsource-parser';

// // Initialize OpenAI with your API key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = new ReadableStream({
//       async start(controller) {
//         function onParse(event: any) {
//           if (event.type === 'event') {
//             const { data } = event;
//             if (data === '[DONE]') {
//               controller.close();
//               return;
//             }
//             try {
//               const json = JSON.parse(data);
//               const text = json.choices[0].text;
//               controller.enqueue(text);
//             } catch (e) {
//               controller.error(e);
//             }
//           }
//         }

//         const parser = createParser(onParse);

//         for await (const chunk of response) {
//           const str = new TextDecoder().decode(chunk);
//           parser.feed(str);
//         }
//       }
//     });

//     return new NextResponse(stream, {
//       headers: {
//         'Content-Type': 'text/plain',
//       }
//     });
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       console.error('An unexpected error occurred:', error);
//       throw error;
//     }
//   }
// }
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
    });

    const text = response.choices[0].message?.content || '';

    return NextResponse.json({ text }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      if (status === 429 && error.code === 'insufficient_quota') {
        return NextResponse.json({
          error: 'You have exceeded your current quota. Please check your OpenAI plan and billing details.',
        }, { status });
      }
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      console.error('An unexpected error occurred:', error);
      return NextResponse.json({
        error: 'An unexpected error occurred while processing the request.',
      }, { status: 500 });
    }
  }
}
