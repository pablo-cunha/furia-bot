import React, { useEffect, useRef, useState } from 'react'
import { furiaData } from '../data/botData';
import "./ChatBot.css"

const ChatBot = () => {

    // Estado que armazena todas as mensagens do chat.
    // Inicialmente contém uma mensagem padrão que exibe o menu de opções.
    const [messages, setMessages] = useState([
        { text: "Olá, Furioso(a)! Escolha uma opção:\n\n" +
                "1️⃣ Últimos jogos\n" +
                "2️⃣ Agenda de partidas\n" +
                "3️⃣ Elenco da FURIA\n" +
                "4️⃣ Loja oficial", 
                sender: "bot" }
      ]);
    
    // Estado que representa o valor digitado pelo usuário no campo de input.
    const [input, setInput] = useState('')

    // Ref que permite que o scrool do chat permaneça sempre na mensagem mais recente.
    const messagesEndRef = useRef(null)
    
    // Effect que rola automaticamente sempre que o estado "messages" é atualizado.
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    // Função que determina a resposta do bot
    const getBotResponse = (userInput) => {
        const input = userInput.trim().toLocaleLowerCase()
        let response = ""
    
        switch (input) {
        case '1':
            response = `🎮 Últimos jogos:\n${furiaData.ultimosJogos.join('\n')}\n\nAlgo mais? Digite a opção desejada ou "menu".`
            break
        case '2':
            response = `📅 Agenda:\n- ${furiaData.proximosJogos.join('\n')}\n\nAlgo mais? Digite a opção desejada ou "menu".`
            break
        case '3':
            response = `👥 Elenco atual:\n${furiaData.elenco.join('\n')}\n\nAlgo mais? Digite a opção desejada ou "menu".`
            break
        case '4':
            response = `🛍️ Loja oficial:\n${furiaData.lojaOficial}\n\nAlgo mais? Digite a opção desejada ou "menu".`
            break
        case 'menu':
            response =
            "Escolha uma opção:\n\n" +
            "1️⃣ Últimos jogos\n" +
            "2️⃣ Agenda de partidas\n" +
            "3️⃣ Elenco da FURIA\n" +
            "4️⃣ Loja oficial"
            break
        default:
            response = "Não entendi 😅. Digite 1, 2, 3, 4 ou 'menu', por favor!"
        }
    
        return { text: response, sender: "bot" }
    }

    /*
       Função que trata o envio de mensagens pelo usuário.
       Válida se o campo de input não está vazio, define a resposta do bot,
       atualiza o estado de mensagens e limpa o input.
    */
    const handleSend = () => {
        // Ignora mensagens em branco
        if(!input.trim()) {
            return
        }

        const userMessage = {text: input, sender: "user"}
        let botResponse = getBotResponse(input)

        // Atualiza o estado de mensagens, adicionando a entrada do usuário e a resposta do bot
        setMessages([...messages, userMessage, botResponse]);
        // Limpa o campo de input após o envio
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
                    <a href="https://github.com/pablo-cunha/furia-bot" target="_blank" rel="noopener noreferrer">
                        Repositório no Github
                    </a>
                </div>        
            </div>
        </>
    )
}

export default ChatBot