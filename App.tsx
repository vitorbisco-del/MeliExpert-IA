
import React, { useState, useRef, useEffect } from 'react';
import { Message, UserLevel, AppView } from './types';
import { QUICK_TIPS } from './constants';
import { geminiService } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import LevelSelector from './components/LevelSelector';
import AdEditor from './components/AdEditor';
import Articles from './components/Articles';
import Tools from './components/Tools';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState<UserLevel>(UserLevel.INICIANTE);
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [view, setView] = useState<AppView>('chat');
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll tips every 4 seconds
  useEffect(() => {
    if (!isChatStarted || view !== 'chat') return;
    
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % QUICK_TIPS.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isChatStarted, view]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, view]);

  const handleStartChat = () => {
    geminiService.initChat(level);
    setIsChatStarted(true);
    const initialMsg: Message = {
      id: 'welcome',
      role: 'model',
      text: `Olá! Sou seu especialista em Mercado Livre. Identifiquei que você está no nível **${level}**. No que posso te ajudar hoje para aumentarmos suas vendas?`,
      timestamp: new Date()
    };
    setMessages([initialMsg]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const modelMsgId = (Date.now() + 1).toString();
    const modelMsg: Message = {
      id: modelMsgId,
      role: 'model',
      text: '',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);

    try {
      let fullResponse = '';
      const stream = geminiService.sendMessageStream(text);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => 
          prev.map(msg => msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg)
        );
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatStarted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-100">
            <i className="fa-solid fa-handshake text-4xl text-gray-900"></i>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">MeliExpert IA</h1>
          <p className="text-gray-500 max-w-md">O braço direito do vendedor no Mercado Livre. Treinado com as melhores estratégias de escala e reputação.</p>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Seu nível como vendedor</p>
            <LevelSelector selectedLevel={level} onSelect={setLevel} />
          </div>

          <button
            onClick={handleStartChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Começar Consultoria
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>

        <footer className="mt-12 text-[10px] text-gray-400 font-medium">
          Powered by Gemini 3 Flash • Base de Conhecimento ML 2024
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex flex-col sm:flex-row items-center justify-between sticky top-0 z-20 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-robot text-gray-900"></i>
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-gray-900 leading-none">MeliExpert IA</h1>
            <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Online • {level}
            </span>
          </div>
          <button 
            onClick={() => setIsChatStarted(false)}
            className="text-gray-300 hover:text-gray-600 p-2 sm:hidden"
          >
            <i className="fa-solid fa-gear"></i>
          </button>
        </div>

        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setView('chat')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
              view === 'chat' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
            }`}
          >
            <i className="fa-solid fa-message mr-2"></i>
            Chat
          </button>
          <button 
            onClick={() => setView('editor')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
              view === 'editor' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
            }`}
          >
            <i className="fa-solid fa-calculator mr-2"></i>
            Simulador
          </button>
          <button 
            onClick={() => setView('articles')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
              view === 'articles' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
            }`}
          >
            <i className="fa-solid fa-book-open mr-2"></i>
            Artigos
          </button>
          <button 
            onClick={() => setView('tools')}
            className={`px-3 sm:px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${
              view === 'tools' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
            }`}
          >
            <i className="fa-solid fa-screwdriver-wrench mr-2"></i>
            Ferramentas
          </button>
        </div>
        
        <button 
          onClick={() => setIsChatStarted(false)}
          className="text-gray-300 hover:text-gray-600 p-2 hidden sm:block"
        >
          <i className="fa-solid fa-gear"></i>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {view === 'chat' && (
          <div className="flex flex-col h-full">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto chat-scroll p-4 space-y-2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5"
            >
              <div className="max-w-4xl mx-auto">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-100 p-4">
              <div className="max-w-4xl mx-auto space-y-3">
                {/* Rolling Suggestion - One at a time */}
                {messages.length < 5 && (
                  <div className="relative h-10 overflow-hidden flex items-center justify-center">
                    <div 
                      key={currentTipIndex}
                      className="absolute inset-0 flex items-center justify-center animate-in slide-in-from-right fade-in duration-500"
                    >
                      <button
                        onClick={() => handleSendMessage(QUICK_TIPS[currentTipIndex])}
                        className="whitespace-nowrap bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-800 text-[10px] sm:text-xs py-2 px-4 rounded-full transition-all flex items-center gap-2 shadow-sm"
                      >
                        <i className="fa-solid fa-wand-magic-sparkles text-[10px]"></i>
                        {QUICK_TIPS[currentTipIndex]}
                      </button>
                    </div>
                  </div>
                )}

                <div className="relative flex items-center gap-2">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(input);
                      }
                    }}
                    placeholder="Dúvida sobre SEO, Full, Ads ou Ficha Técnica?"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 pr-14 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none h-[52px] max-h-32 transition-all"
                    rows={1}
                  />
                  <button
                    onClick={() => handleSendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    className={`absolute right-2 p-2 rounded-xl transition-all ${
                      input.trim() && !isLoading 
                        ? 'bg-yellow-400 text-gray-900 shadow-md' 
                        : 'bg-gray-100 text-gray-300'
                    }`}
                  >
                    <i className="fa-solid fa-paper-plane text-sm"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'editor' && (
          <div className="h-full overflow-y-auto chat-scroll bg-gray-50">
            <AdEditor />
          </div>
        )}

        {view === 'articles' && (
          <div className="h-full overflow-y-auto chat-scroll bg-gray-50">
            <Articles />
          </div>
        )}

        {view === 'tools' && (
          <div className="h-full overflow-y-auto chat-scroll bg-gray-50">
            <Tools />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
