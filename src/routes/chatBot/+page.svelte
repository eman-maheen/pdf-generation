<script lang="ts">
      type Message = {
      sender: 'user' | 'bot';
      text: string;
    };
    let userInput = '';
    let conversation: Message[] = [];
    let isBotTyping = false;
    let chatContainer: HTMLDivElement | null = null;
  
    async function sendMessage() {
      if (userInput.trim() && !isBotTyping) {
        conversation = [...conversation, { sender: 'user', text: userInput }];
        isBotTyping = true;
        userInput = '';
  
        try {
          const response = await fetch(`/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: conversation[conversation.length - 1].text }),
          });
  
          const data = await response.json();
          console.log("data", data)
          conversation = [...conversation, { sender: 'bot', text: data.response }];
        } catch (error) {
          conversation = [...conversation, { sender: 'bot', text: 'Error generating response. Please try again later.' }];
        } finally {
          isBotTyping = false;
          scrollToBottom();
        }
      }
    }
  
    function scrollToBottom() {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  
  </script>
  
  <div class="chat-wrapper">
    <div class="chat-container" bind:this={chatContainer}>
      {#each conversation as msg}
        <div class="message {msg.sender}">
          <p>{msg.text}</p>
        </div>
      {/each}
  
      {#if isBotTyping}
        <div class="message bot typing-indicator">
          <p>Bot is typing...</p>
        </div>
      {/if}
    </div>
  
    <div class="input-container">
      <input 
        bind:value={userInput} 
        type="text" 
        placeholder="Ask me anything..." 
        on:keydown={(e) => e.key === 'Enter' && sendMessage()} 
        disabled={isBotTyping}
      />
      <button on:click={sendMessage} disabled={isBotTyping}>Send</button>
    </div>
  </div>
  
  <style>
    .chat-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh; 
    }
  
    .chat-container {
      width: 70%;
      max-width: 800px;
      height: 400px;
      overflow-y: auto;
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  
    .message {
      padding: 10px;
      border-radius: 10px;
      max-width: 75%;
      margin-bottom: 10px;
    }
  
    .message.user {
      background-color: #dcf8c6;
      align-self: flex-end;
    }
  
    .message.bot {
      background-color: #f1f0f0;
      align-self: flex-start;
    }
  
    .typing-indicator {
      font-style: italic;
      opacity: 0.7;
    }
  
    .input-container {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      width: 70%;
      max-width: 800px;
    }
  
    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
    }
  
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
      font-size: 1rem;
    }
  
    button:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }
  </style>

<!-- 
   <script lang="ts">
let prompt = ''
let messages: string[] = []

async function sendPrompt() {
    const response = await fetch ('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form' },
        body:  `prompt=${encodeURIComponent(prompt)}`,
    })
    const message = await response.json()
    messages=[...messages, message.data]
}


   </script>
   <form method="post" on:submit|preventDefault={sendPrompt}>
<label for="prompt">Prompt:
<textarea id="prompt" name="prompt" rows="4" bind:value={prompt} ></textarea><br>
</label>
<button type="submit">Send</button>
   </form>

   {#each messages as message}
    <pre>{message}</pre>
   {/each} -->