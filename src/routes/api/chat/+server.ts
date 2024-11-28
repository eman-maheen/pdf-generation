import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { env } from '$env/dynamic/private'; 

export const POST: RequestHandler = async ({ request }) => {
  const { message } = await request.json();

  try {
    // OpenAI API call
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant for a website.' },
          { role: 'user', content: message }
        ],
       
      },
      {
        headers: {
          Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        },
      }
    );

    const botResponse = response.data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: botResponse }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    
    let errorMessage = 'Error generating response';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = `OpenAI API error: ${error.response.data?.error?.message || 'Unknown error'}`;
    }

    return new Response(
      JSON.stringify({ response: errorMessage }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
};
