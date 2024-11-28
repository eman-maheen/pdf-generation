import { env } from '$env/dynamic/private'; 

export const actions = {
    default: async ({request}) => {
        const form = await request.formData(); 
        const prompt = form.get('prompt');
        const openai_key = env.OPENAI_KEY;
        console.log(prompt);
        const body = {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'user', content: prompt }
            ],
           
          }
          const response = await fetch(
            'https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${openai_key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const data = await response.json();
            console.log("data: " + data)
            const message = data['choices'][0]['message']['content'];
            return message;

    }
}