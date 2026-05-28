'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageSquare, Send, Bot, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { saveAIMessage, getAIMessages } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import type { AIMessage } from '@/types';

export default function ChatPage() {
  const { user, isDemo } = useAuth();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') || '';

  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Quick Prompt buttons
  const quickPrompts = [
    'Help me reply to her last message',
    'Does my bio sound desperate?',
    'Rewrite my bio to sound more interesting',
    'Give me 3 reply options (playful, mature, calm)',
    'Prepare me for an introductory matrimony call',
    'Tell me if I should stop texting or wait',
    'How do I re-engage in a dying conversation?',
  ];

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load chat messages on mount
  useEffect(() => {
    const loadChat = async () => {
      if (user) {
        if (isDemo) {
          // Demo/Guest: load from sessionStorage
          if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('demo_chat_history');
            if (stored) {
              try {
                setMessages(JSON.parse(stored) as AIMessage[]);
              } catch (e) {
                console.error('Error parsing demo chat history:', e);
              }
            }
          }
        } else {
          try {
            const chatHistory = await getAIMessages(user.uid);
            setMessages(chatHistory);
          } catch (err) {
            console.error('Error fetching chat history:', err);
          }
        }
      }
      setLoading(false);
    };
    loadChat();
  }, [user, isDemo]);

  // Scroll on message updates
  useEffect(() => {
    scrollToBottom();
  }, [messages, sending]);

  // Pre-fill initial prompt based on search params
  useEffect(() => {
    if (initialMode === 'matrimony') {
      setInputText('I am preparing for an introductory matrimony call. What are the key compatibility questions I should ask, and how can I sound confident and respectful?');
    } else if (initialMode === 'bio') {
      setInputText('Rewrite my bio to sound more interesting and show some warmth.');
    } else if (initialMode === 'chat-rescue') {
      setInputText('My conversation is fizzling out. How do I re-engage her without sounding desperate?');
    }
  }, [initialMode]);

  // Premium Simulated responses for quick, error-free feedback in Demo or API failure
  const getMockResponse = (inputText: string): string => {
    const lower = inputText.toLowerCase();
    if (lower.includes('bio') || lower.includes('profile')) {
      return `Here are two premium, high-converting bio rewrites that display personality and easy conversation hooks:\n\n**Option 1 (Playful & Warm):**\n"Gym regular, biryani loyalist, and emotionally available on alternate weekends."\n\n**Option 2 (Sleek & Curious):**\n"Looking for someone to explore the best filter coffee spots in town, or debate why dogs are definitely judging us."\n\n**Vibe Fix:** Keep it under 3 lines. Avoid generic statements like "I like to travel." Specific details give her something easy to reply to.`;
    }
    if (lower.includes('reply') || lower.includes('option') || lower.includes('opener')) {
      return `Here are 3 reply options you can send right now to fix the vibe:\n\n**1. Playful Option:**\n"Okay serious question — is your dog always judging people or just me?"\n\n**2. Chill Option:**\n"That's a solid choice. I'm usually team biryani, but I can negotiate."\n\n**3. Direct Option:**\n"I really like your vibe. Let's grab coffee this Thursday evening?"\n\n**Vibe Fix:** Never open with 'hi' or 'hey'. Ask specific, engaging questions that take less than 10 seconds to answer.`;
    }
    if (lower.includes('matrimony') || lower.includes('marriage')) {
      return `When preparing for a matrimony call, you want to show maturity, alignment, and emotional availability. Avoid treating it like a job interview.\n\n**Key Questions to Ask:**\n1. *"What kind of daily routine or space do you value most in a relationship?"*\n2. *"How do you like to unwind after a crazy work week?"*\n3. *"What are some non-negotiables for you when thinking about compatibility?"*\n\n**First Impression Tip:** Listen 60% of the time, speak 40%. Keep your tone warm, respectful, and clear.`;
    }
    return `That's a very common situation. The key to fixing the vibe is to break the ice with something specific and interesting. Instead of general questions, zoom in on a detail in her profile or a shared interest.\n\nTry asking: *"Okay, help me settle a debate. What is the single most overrated food in the city?"*\n\nThis is light, funny, and has a 90% response rate.`;
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || !user) return;

    const userText = textToSend;
    setInputText('');
    setSending(true);

    const userMessage: AIMessage = {
      userId: user.uid,
      role: 'user',
      message: userText,
      mode: 'live',
      createdAt: new Date() as any, // Temporary client-side mock date
    };

    // Update client UI instantly
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    if (isDemo && typeof window !== 'undefined') {
      sessionStorage.setItem('demo_chat_history', JSON.stringify(updatedMessages));
    }

    try {
      // 1. Save User Message to Firestore (Only if real authenticated user)
      if (!isDemo) {
        await saveAIMessage(user.uid, 'user', userText, 'live');
      }

      let assistantResponseText = '';
      let assistantResponseMode: 'live' | 'offline' = 'live';

      // 2. Fetch from Gemini API
      try {
        const response = await fetch('/api/smooth-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userText,
            history: updatedMessages.slice(-10).map((m) => ({
              role: m.role,
              content: m.message,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error('API server returned error');
        }

        const data = await response.json();
        assistantResponseText = data.response;
        assistantResponseMode = data.mode || 'live';
      } catch (apiErr) {
        console.warn('API/Gemini failed, using offline simulation fallback:', apiErr);
        // Fallback simulated response
        assistantResponseText = getMockResponse(userText);
        assistantResponseMode = 'offline';
      }
      
      // 3. Save Assistant Response to Firestore (Only if real authenticated user)
      if (!isDemo) {
        await saveAIMessage(user.uid, 'assistant', assistantResponseText, assistantResponseMode);
      }

      const assistantMessage: AIMessage = {
        userId: user.uid,
        role: 'assistant',
        message: assistantResponseText,
        mode: assistantResponseMode,
        createdAt: new Date() as any,
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      if (isDemo && typeof window !== 'undefined') {
        sessionStorage.setItem('demo_chat_history', JSON.stringify(finalMessages));
      }
    } catch (err) {
      console.error('AI chat failed:', err);
      // Absolute fallback offline alert
      const offlineText = getMockResponse(userText);
      
      if (!isDemo) {
        await saveAIMessage(user.uid, 'assistant', offlineText, 'offline');
      }

      const assistantMessage: AIMessage = {
        userId: user.uid,
        role: 'assistant',
        message: offlineText,
        mode: 'offline',
        createdAt: new Date() as any,
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      if (isDemo && typeof window !== 'undefined') {
        sessionStorage.setItem('demo_chat_history', JSON.stringify(finalMessages));
      }
    } finally {
      setSending(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  const handleQuickPromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <LoadingSpinner size="md" />
        <p className="mt-2 text-sm text-muted-foreground animate-pulse">
          Opening secure chat...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-64px)] relative">
      
      {/* Chat Window Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple">
            <Bot size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-base font-bold text-white leading-tight flex items-center gap-1.5">
              Smooth AI
              {isDemo && (
                <span className="px-1.5 py-0.5 text-[8px] bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded font-semibold uppercase tracking-wider">
                  Demo
                </span>
              )}
            </span>
            <span className="text-[10px] text-muted-foreground">
              Dating & Matrimony Confidence Coach
            </span>
          </div>
        </div>

        {isDemo && (
          <div className="text-[10px] text-amber-300 font-medium">
            Demo Mode — responses are simulated
          </div>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-grow overflow-y-auto py-6 space-y-4 pr-1 scrollbar-thin scrollbar-thumb-purple/10">
        
        {/* Welcome Bot Bubble */}
        {messages.length === 0 && (
          <div className="flex items-start space-x-3 max-w-[85%] text-left">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple flex-shrink-0 mt-0.5">
              <Bot size={16} />
            </div>
            <GlassCard className="p-4 rounded-2xl rounded-tl-none border-white/5 text-sm text-white/95 leading-relaxed">
              Tell me what you are trying to say, what she said, or what situation you are in. I will help you reply with confidence, clarity, and respect.
            </GlassCard>
          </div>
        )}

        {/* Chat History Messages */}
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={index}
              className={`flex items-start space-x-3 max-w-[85%] text-left ${
                isUser ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple flex-shrink-0 mt-0.5">
                  <Bot size={16} />
                </div>
              )}
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed border ${
                  isUser
                    ? 'gradient-bg text-white border-transparent rounded-tr-none shadow-md shadow-purple/10'
                    : 'glass text-white/95 rounded-tl-none border-white/5'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.message}</p>
                {msg.mode === 'offline' && (
                  <span className="text-[8px] uppercase tracking-widest text-amber-400 font-bold block mt-2 flex items-center gap-1">
                    <Sparkles size={8} /> Offline Fallback Advice
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading / Typing Indicator */}
        {sending && (
          <div className="flex items-start space-x-3 max-w-[85%] text-left">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-purple flex-shrink-0 mt-0.5">
              <Bot size={16} />
            </div>
            <GlassCard className="p-4 rounded-2xl rounded-tl-none border-white/5 text-xs text-muted-foreground flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-purple animate-bounce" style={{ animationDelay: '300ms' }} />
            </GlassCard>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel (Scrollable) */}
      {messages.length === 0 && (
        <div className="flex space-x-2 py-3 overflow-x-auto flex-shrink-0 whitespace-nowrap scrollbar-none scrollbar-thin scrollbar-thumb-white/5 scroll-pl-1 select-none">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleQuickPromptClick(prompt)}
              className="text-xs font-semibold px-4 py-2 rounded-full border border-white/10 hover:border-purple/30 bg-white/5 text-white/80 hover:text-white transition-all cursor-pointer focus:outline-none"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Box Footer */}
      <div className="pt-4 border-t border-white/5 flex-shrink-0 flex flex-col space-y-3">
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isDemo ? "Type something (e.g. bio, reply)..." : "Describe the situation or paste what she texted..."}
            required
            className="w-full pl-4 pr-14 py-3 bg-white/5 border border-white/10 rounded-xl text-sm focus:border-purple focus:outline-none"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !inputText.trim()}
            className="absolute right-2 p-2 rounded-lg gradient-bg text-white hover:opacity-90 transition-all disabled:opacity-30 focus:outline-none cursor-pointer"
          >
            <Send size={16} />
          </button>
        </form>

        {/* Safety reminder */}
        <div className="flex items-center justify-center space-x-2 text-[10px] text-muted-foreground text-center">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>Smooth Operator Chat is confidential and enforces respectful interaction guidelines.</span>
        </div>
      </div>
      
    </div>
  );
}
