import React, { useState } from 'react'
import { elenco, lojaOficial } from '../data/botData';
import "./ChatBot.css"

const ChatBot = () => {

    const [messages, setMessages] = useState([
        { text: "Olá, Furioso(a)! Escolha uma opção:\n\n" +
                "1️⃣ Últimos jogos\n" +
                "2️⃣ Agenda de partidas\n" +
                "3️⃣ Elenco da FURIA\n" +
                "4️⃣ Loja oficial", 
                sender: "bot" }
      ]);

    const [input, setInput] = useState('')

    const handleSend = () => {
        if(!input.trim()) {
            return
        }

        const userMessage = {text: input, sender: "user"}
        var botResponse = {text: "Não entendi 😅. Digite 1, 2, 3, 4 ou 'menu', por favor!", sender: "bot"}

        switch (input.trim()) {
            case '1':
              botResponse.text = '🔍 Últimos jogos:\n- FURIA 2x1 Liquid\n- FURIA 0x2 G2\n- FURIA 2x0 Imperial\n\nAlgo mais? Digite a opção desejada ou "menu".'
              break
            case '2':
              botResponse.text = '📅 Agenda:\n- 30/04 vs Vitality às 20h\n- 03/05 vs Astralis às 19h\n\nAlgo mais? Digite a opção desejada ou "menu".'
              break
            case '3':
              botResponse.text = `👥 Elenco atual:\n${elenco.join('\n')}\n\nAlgo mais? Digite a opção desejada ou "menu".`
              break
            case '4':
              botResponse.text = `🛍️ Loja oficial:\n${lojaOficial}\n\nAlgo mais? Digite a opção desejada ou "menu".`
              break
            case 'menu':
            default:
              botResponse.text = 
                "Escolha uma opção:\n\n" +
                "1️⃣ Últimos jogos\t" +
                "2️⃣ Agenda de partidas\n" +
                "3️⃣ Elenco da FURIA\n" +
                "4️⃣ Loja oficial";
          }

          setMessages([...messages, userMessage, botResponse]);
          setInput('');
    }

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} 
                    className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
                    >
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input type="text" 
                placeholder="Digite sua mensagem..." 
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && handleSend()}
                />
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default ChatBot