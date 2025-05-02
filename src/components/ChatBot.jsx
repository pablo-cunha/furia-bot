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
                "4️⃣ Loja oficial\n" + 
                "5️⃣ Últimas notícias da FURIA", 
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

        switch (input) {
            case '1':
                return {
                    text: `🎮 Últimos jogos:\n${furiaData.ultimosJogos.join('\n')}\n\nAlgo mais? Digite a opção desejada ou "menu".`,
                    sender: "bot"
                }
            case '2':
                return {
                    text: `📅 Agenda:\n- ${furiaData.proximosJogos.join('\n')}\n\nAlgo mais? Digite a opção desejada ou "menu".`,
                    sender: "bot"
                }
            case '3':
                return {
                    text: `👥 Elenco atual:\n${furiaData.elenco.join('\n')}\n\nAlgo mais? Digite a opção desejada ou "menu".`,
                    sender: "bot"
                }
            case '4':
                return {
                    text: (
                        <>
                            🛍️ Loja oficial:{" "}
                            <a href={furiaData.lojaOficial} target="_blank" rel="noopener noreferrer">
                                Acesse aqui
                            </a>
                            <br /><br />
                            Algo mais? Digite a opção desejada ou "menu".
                        </>
                    ),
                    sender: "bot"
                }
            case '5':
                return {
                    text: '🔄 Buscando as últimas notícias da FURIA...',
                    sender: 'bot',
                    isLoading: true
                }
            case 'menu':
                return {
                    text: (
                        <>
                            Escolha uma opção:<br /><br />
                            1️⃣ Últimos jogos<br />
                            2️⃣ Agenda de partidas<br />
                            3️⃣ Elenco da FURIA<br />
                            4️⃣ Loja oficial<br />
                            5️⃣ Últimas notícias da FURIA
                        </>
                    ),
                    sender: "bot"
                }
            default:
                return {
                    text: "Não entendi 😅. Digite de 1 a 5 ou 'menu', por favor!",
                    sender: "bot"
                }
        }
    }

    // Função que consome API de notícias, filtradas para buscar notícias relacionadas à FURIA
    const fetchFuriaNews = async () => {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY 
        const url = `https://newsapi.org/v2/everything?q=FURIA&language=pt&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`
      
        try {
          // Envia uma requisição GET à API de notícias com base na pesquisa "FURIA"
          const response = await fetch(url)
          // Converte a resposta da API em JSON
          const data = await response.json()
        
          // Verifica se a resposta trouxe alguma noticia
          if (data.articles && data.articles.length > 0) {
            // Cria o HTML que será exposto com as notícias
            const articles = data.articles.map((article) => (
              <div key={article.url}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </div>
            ))
            
            // Retorna mensagem de resposta do bot, com o HTML das notícias embutido
            return {
              text: (
                <>
                  📰 Últimas notícias da FURIA:
                  {articles}
                  <br />
                  Algo mais? Digite a opção desejada ou "menu".
                </>
              ),
              sender: 'bot'
            }
          } else {
            // Mensagem para caso não se encontre nenhuma notícia
            return {
              text: 'Desculpe, não encontrei notícias recentes da FURIA.',
              sender: 'bot'
            }
          }
        } catch (error) {
          // Em caso de erro na requisição, imprime o erro no console e retorna mensagem de erro pro usuário
          console.error('Erro ao buscar notícias:', error)
          return {
            text: 'Ocorreu um erro ao buscar as notícias. Por favor, tente novamente mais tarde.',
            sender: 'bot'
          };
        }
      };      

    /*
       Função que trata o envio de mensagens pelo usuário.
       Válida se o campo de input não está vazio, define a resposta do bot,
       atualiza o estado de mensagens e limpa o input.
    */
    const handleSend = async () => {
        // Ignora mensagens em branco
        if(!input.trim()) {
            return
        }

        const userMessage = { text: input, sender: 'user' }
        setMessages((prevMessages) => [...prevMessages, userMessage])
        setInput('')

        const inputLower = input.trim().toLowerCase()

        if (inputLower === '5') {
            // Adiciona uma mensagem de carregamento
            setMessages((prevMessages) => [
            ...prevMessages,
            { text: '🔄 Buscando as últimas notícias da FURIA...', sender: 'bot' }
            ])

            // Busca as notícias
            const newsMessage = await fetchFuriaNews()

            // Atualiza a última mensagem com as notícias
            setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages]
            updatedMessages[updatedMessages.length - 1] = newsMessage
            return updatedMessages
            })
        } else {
            const botResponse = getBotResponse(input)
            setMessages((prevMessages) => [...prevMessages, botResponse])
        }
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
                            {typeof msg.text === 'string' ? <p>{msg.text}</p> : msg.text}
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