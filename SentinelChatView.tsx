import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/Card';
import { Input } from '@/Input';
import { Button } from '@/Button';
import { createSentinelChat } from '@/gemini';

export function SentinelChatView() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hello. I am the Digital Sentinel. How can I assist you with securing your digital assets today? We can discuss Multi-Party Computation, Zero Trust, Metadata Scrubbing, or RUFADAA succession planning.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initChat() {
      try {
        const session = await createSentinelChat();
        setChatSession(session);
      } catch (err) {
        console.error("Failed to init chat", err);
      }
    }
    initChat();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await chatSession.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text || '' }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: 'Error connecting to the Sentinel core. Please check your API key.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px] border-teal-900/50">
      <CardHeader className="border-b border-slate-800 pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-teal-500" />
          Digital Sentinel
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-800' : 'bg-teal-900/50 border border-teal-500/50'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4 text-slate-300" /> : <Bot className="w-4 h-4 text-teal-400" />}
            </div>
            <div className={`rounded-xl px-4 py-2 ${msg.role === 'user' ? 'bg-slate-800 text-slate-200' : 'bg-slate-900/80 border border-slate-800 text-slate-300'}`}>
              {msg.role === 'user' ? (
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <div className="prose prose-sm prose-invert prose-p:leading-relaxed prose-pre:bg-slate-950 prose-a:text-teal-400 max-w-none">
                  <Markdown>{msg.text}</Markdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 max-w-[85%]">
             <div className="w-8 h-8 rounded-full bg-teal-900/50 border border-teal-500/50 flex items-center justify-center shrink-0">
               <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
             </div>
             <div className="rounded-xl px-4 py-2 bg-slate-900/80 border border-slate-800 flex items-center">
               <span className="flex gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce"></span>
               </span>
             </div>
          </div>
        )}
      </CardContent>
      <div className="p-3 border-t border-slate-800 bg-slate-950/50 rounded-b-xl flex gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask the Digital Sentinel..."
          className="flex-1 bg-slate-900"
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()} size="icon">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
