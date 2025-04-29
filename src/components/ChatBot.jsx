import React, { useState } from 'react'
import "./ChatBot.css"

const ChatBot = () => {

    const [input, setInput] = useState('')
    
    return (
        <div className="chat-container">
            <div className="chat-box">
                <p className="chat-message">Mensagem</p>
            </div>
            <div className="chat-input">
                <input type="text" 
                placeholder="Digite sua mensagem..." 
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter"}
                />
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default ChatBot