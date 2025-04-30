import React, { useEffect, useRef, useState } from 'react'
import { furiaData } from '../data/botData';
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

    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const handleSend = () => {
        if(!input.trim()) {
            return
        }

        const userMessage = {text: input, sender: "user"}
        let botResponse = {text: "", sender: "bot"}

        switch (input.trim().toLocaleLowerCase()) {
            case '1':
              botResponse.text = `🎮 Últimos jogos:\n${furiaData.ultimosJogos.join('\n')}\n\n
              Algo mais? Digite a opção desejada ou "menu".`
              break
            case '2':
              botResponse.text = `📅 Agenda:\n- ${furiaData.proximosJogos.join('\n')}\n\n
              Algo mais? Digite a opção desejada ou "menu".`
              break
            case '3':
              botResponse.text = `👥 Elenco atual:\n${furiaData.elenco.join('\n')}\n\n
              Algo mais? Digite a opção desejada ou "menu".`
              break
            case '4':
              botResponse.text = `🛍️ Loja oficial:\n${furiaData.lojaOficial}\n\n
              Algo mais? Digite a opção desejada ou "menu".`
              break
            case 'menu':
                botResponse.text = 
                "Escolha uma opção:\n\n" +
                "1️⃣ Últimos jogos\n" +
                "2️⃣ Agenda de partidas\n" +
                "3️⃣ Elenco da FURIA\n" +
                "4️⃣ Loja oficial";
                break
            default:
                botResponse.text = "Não entendi 😅. Digite 1, 2, 3, 4 ou 'menu', por favor!"
                
          }

          setMessages([...messages, userMessage, botResponse]);
          setInput('');
    }

    return (
        <>
            <div className="chat-container">
                <div className="chat-header">
                    FuriaBOT
                </div>
                <div className="chat-box">
                    {messages.map((msg, index) => (
                        <div key={index} 
                        className={msg.sender === 'user' ? 'user-message' : 'bot-message'}
                        >
                            <p>{msg.text}</p>
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
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
            <div className="footer-container">
                <div>
                    <p>Desenvolvido por Pablo Cunha</p>
                </div>
                <div>
                    <a href="http://">Repositório no Github</a>
                </div>        
            </div>
        </>
    )
}

export default ChatBot