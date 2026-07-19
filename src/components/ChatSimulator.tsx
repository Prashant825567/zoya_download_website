/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Volume2, Mic, Heart, Cpu, Send, Smartphone, Battery, Wifi, Trash2, Command, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { SIMULATED_CONVERSATIONS } from '../data';
import { PersonalityMode, ChatMessage } from '../types';

export default function ChatSimulator() {
  const [mode, setMode] = useState<PersonalityMode>('assistant');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeActions, setActiveActions] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [systemOverlayText, setSystemOverlayText] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting based on mode
  useEffect(() => {
    resetChat(mode);
  }, [mode]);

  const resetChat = (selectedMode: PersonalityMode) => {
    setMessages([
      {
        id: 'welcome',
        sender: 'zoya',
        text: selectedMode === 'assistant' 
          ? "Ji Boss! 👔 Main Zoya Assistant v4.6 hoon. Mobile screen, WhatsApp automation, aur 26+ devices control karne ke liye taiyaar hoon. Aap kya automation karna chahte hain?"
          : "Haan jaan ❤️... main Zoya hoon! Aapki sweet AI companion. Aaj ka din kaisa raha aapka? Main aapka mood light karne ke liye humesha taiyaar hoon. 😘",
        timestamp: new Date()
      }
    ]);
    setActiveActions([]);
    setActiveImage(null);
    setActiveCode(null);
    setSystemOverlayText(null);
    setIsTyping(false);
  };

  const handlePromptSelect = (promptText: string, responseObj: any) => {
    if (isTyping) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setActiveActions([]);
    setActiveImage(null);
    setActiveCode(null);
    setSystemOverlayText(null);

    // Simulate delay
    setTimeout(() => {
      setIsTyping(false);

      const zoyaMsg: ChatMessage = {
        id: `zoya-${Date.now()}`,
        sender: 'zoya',
        text: responseObj.voiceText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, zoyaMsg]);

      if (responseObj.actions) {
        setActiveActions(responseObj.actions);
      }
      if (responseObj.imageUrl) {
        setActiveImage(responseObj.imageUrl);
      }
      if (responseObj.code) {
        setActiveCode(responseObj.code);
        setSystemOverlayText("TextOverlay: Code generation active");
      }
    }, 1200);
  };

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, activeActions]);

  const playSynthesizedVoiceBeep = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(mode === 'assistant' ? 600 : 750, now);
      osc.frequency.linearRampToValueAtTime(mode === 'assistant' ? 800 : 900, now + 0.3);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch(e) {
      console.warn(e);
    }
  };

  const currentConversations = mode === 'assistant' ? SIMULATED_CONVERSATIONS.assistant : SIMULATED_CONVERSATIONS.girlfriend;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
      {/* Description and Controller column (Left) */}
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0f0f1a] border border-[#1a1a2e] text-zinc-400 text-xs font-mono">
          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />
          <span>Bilingual Personality Switcher</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white leading-tight">
          Talk to Zoya: Experience Dual Personas
        </h2>
        
        <p className="text-zinc-400 text-sm md:text-base font-sans leading-relaxed">
          Zoya is unique because of her dual cognitive models. Switch below to see how she responds with entirely different tones, styles, and automated workflows.
        </p>

        {/* Mode Toggle Buttons */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#050508] border border-[#1a1a2e] rounded-2xl">
          <button
            id="mode-assistant"
            onClick={() => {
              setMode('assistant');
              playSynthesizedVoiceBeep();
            }}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
              mode === 'assistant'
                ? 'bg-gradient-to-r from-cyan-500/10 to-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            <Cpu className="w-4 h-4" />
            ASSISTANT MODE
          </button>
          <button
            id="mode-girlfriend"
            onClick={() => {
              setMode('girlfriend');
              playSynthesizedVoiceBeep();
            }}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
              mode === 'girlfriend'
                ? 'bg-gradient-to-r from-purple-500/10 to-purple-500/20 text-purple-400 border border-purple-500/40 shadow-[0_0_15px_rgba(147,51,234,0.15)]'
                : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
            }`}
          >
            <Heart className="w-4 h-4 text-purple-500" />
            GIRLFRIEND MODE
          </button>
        </div>

        {/* Quick Instructions list */}
        <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-2xl p-4 md:p-5 space-y-4 shadow-xl">
          <h4 className="text-xs font-mono text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            How Zoya Automates Your Phone
          </h4>
          
          <ul className="space-y-2.5 text-xs text-zinc-400">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span><strong>Background Wake Word:</strong> Vosk AI wakes Zoya even if locked.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
              <span><strong>Accessibility Integration:</strong> Automatically types, searches, and clicks in external apps like WhatsApp.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span><strong>Floating Overlays:</strong> Shows code, text, and custom AI images without leaving your current app screen.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Mock Mobile View column (Right) */}
      <div className="lg:col-span-7 flex justify-center">
        <div className="relative w-full max-w-[370px] aspect-[9/19] rounded-[42px] bg-[#050508] border-[6px] border-[#1a1a2e] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
          {/* Phone Top Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a2e] rounded-b-xl z-30 flex items-center justify-center">
            <div className="w-12 h-1 bg-black rounded-full mb-1" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 ml-3 mb-1 border border-zinc-700/40" />
          </div>

          {/* Status Bar */}
          <div className="h-10 bg-[#050508] flex items-end justify-between px-6 pb-1 text-[10px] font-mono text-zinc-500 z-20 shrink-0">
            <span>10:46 AM</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3" />
              <span className="text-[9px]">5G</span>
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Chat Header */}
          <div className={`py-3 px-5 border-b border-[#1a1a2e] flex items-center justify-between shrink-0 z-20 relative transition-colors duration-500 ${
            mode === 'assistant' ? 'bg-cyan-950/20' : 'bg-purple-950/20'
          }`}>
            <div className="flex items-center gap-2.5">
              {/* Avatar indicator */}
              <div className="relative w-8 h-8 rounded-full border border-[#1a1a2e] overflow-hidden bg-[#0f0f1a]">
                <div className={`absolute inset-0.5 rounded-full animate-pulse ${
                  mode === 'assistant' ? 'bg-cyan-500/10' : 'bg-purple-500/10'
                }`} />
                <div className={`w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-[#050508] ${
                  mode === 'assistant' ? 'bg-cyan-400' : 'bg-purple-500'
                }`} />
                <Cpu className={`w-4 h-4 absolute inset-0 m-auto ${
                  mode === 'assistant' ? 'text-cyan-400' : 'text-purple-400'
                }`} />
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-white tracking-wide">Zoya AI</span>
                  <span className="text-[8px] px-1 rounded bg-[#1a1a2e] text-zinc-400 font-mono">v4.6</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] text-zinc-500">
                  <span className={`w-1 h-1 rounded-full animate-ping ${
                    mode === 'assistant' ? 'bg-cyan-400' : 'bg-purple-400'
                  }`} />
                  <span>Always listening...</span>
                </div>
              </div>
            </div>

            <button 
              id="clear-sim-history"
              onClick={() => resetChat(mode)}
              title="Reset Chat"
              className="p-1.5 rounded-lg bg-[#0f0f1a] hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 border border-[#1a1a2e] transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Screen Overlay (Floating overlay simulated) */}
          <AnimatePresence>
            {activeImage && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="absolute inset-x-3 top-24 bottom-24 bg-[#050508]/95 border border-purple-500/30 rounded-2xl z-40 p-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>ZOYA IMAGE_OVERLAY</span>
                  </div>
                  <button 
                    id="close-sim-img"
                    onClick={() => setActiveImage(null)}
                    className="text-[10px] text-zinc-500 hover:text-zinc-300 font-mono cursor-pointer"
                  >
                    CLOSE [X]
                  </button>
                </div>

                <div className="flex-1 rounded-lg overflow-hidden border border-[#1a1a2e] bg-[#0f0f1a] flex items-center justify-center relative">
                  <img 
                    src={activeImage} 
                    alt="AI Generated" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-2 text-[10px] text-center text-zinc-300 font-sans">
                    "A cozy wooden cottage in snow mountains"
                  </div>
                </div>
              </motion.div>
            )}

            {activeCode && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute inset-x-3 top-24 bottom-24 bg-[#050508]/95 border border-cyan-500/30 rounded-2xl z-40 p-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400">
                    <Command className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ZOYA TEXT_OVERLAY</span>
                  </div>
                  <button 
                    id="close-sim-code"
                    onClick={() => {
                      setActiveCode(null);
                      setSystemOverlayText(null);
                    }}
                    className="text-[10px] text-zinc-500 hover:text-zinc-300 font-mono cursor-pointer"
                  >
                    CLOSE [X]
                  </button>
                </div>

                <div className="flex-1 rounded-lg border border-[#1a1a2e] bg-[#0f0f1a]/60 p-3 overflow-y-auto font-mono text-[10px] text-emerald-400 text-left whitespace-pre-wrap">
                  {activeCode}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl py-2.5 px-3.5 shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 text-white rounded-tr-none border border-zinc-800'
                    : mode === 'assistant'
                      ? 'bg-cyan-950/40 text-cyan-100 border border-cyan-500/10 rounded-tl-none backdrop-blur-sm'
                      : 'bg-purple-950/40 text-purple-100 border border-purple-500/10 rounded-tl-none backdrop-blur-sm'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[8px] text-zinc-600 font-mono mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-[#0f0f1a] border border-[#1a1a2e] rounded-2xl rounded-tl-none py-3 px-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Displaying Live Automation Steps */}
            <AnimatePresence>
              {activeActions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-xl border border-[#1a1a2e] bg-[#050508] p-3 mt-2 text-left"
                >
                  <div className="flex items-center gap-1 mb-2">
                    <Smartphone className="w-3 h-3 text-cyan-400" />
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">Device Automation Pipeline</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[9px] text-zinc-500">
                    {activeActions.map((act, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="text-zinc-300">{act}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>

          {/* Interactive Floating Wave Form (Voice chat indicator) */}
          <div className="h-10 bg-[#050508]/80 backdrop-blur-md flex items-center justify-center px-4 border-t border-[#1a1a2e] z-10 shrink-0">
            <div className="flex items-center gap-1">
              <span className={`w-0.5 h-3.5 rounded bg-cyan-500 ${isTyping ? 'animate-pulse' : ''}`} />
              <span className={`w-0.5 h-6 rounded bg-cyan-400 ${isTyping ? 'animate-pulse' : ''}`} />
              <span className={`w-0.5 h-4 rounded bg-purple-500 ${isTyping ? 'animate-pulse' : ''}`} />
              <span className={`w-0.5 h-7 rounded bg-purple-400 ${isTyping ? 'animate-pulse' : ''}`} />
              <span className={`w-0.5 h-5 rounded bg-cyan-400 ${isTyping ? 'animate-pulse' : ''}`} />
              <span className={`w-0.5 h-3 rounded bg-cyan-500 ${isTyping ? 'animate-pulse' : ''}`} />
            </div>
            <span className="text-[9px] font-mono text-zinc-600 ml-3 uppercase tracking-widest">
              {isTyping ? "PROCESSING WAVEFORM" : "WAKEWORD 'ZOYA' RUNNING"}
            </span>
          </div>

          {/* Suggestions Tray (Pre-programmed questions to send) */}
          <div className="p-3 bg-[#050508] border-t border-[#1a1a2e] shrink-0 z-20">
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block mb-2 text-left">
              TAP PROMPT TO TRIGGER SYSTEM AUTOMATION
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
              {currentConversations.map((conv, idx) => (
                <button
                  key={idx}
                  id={`btn-prompt-${idx}`}
                  disabled={isTyping}
                  onClick={() => handlePromptSelect(conv.trigger, conv.response)}
                  className={`snap-center shrink-0 text-[10px] py-1.5 px-3 rounded-lg border text-left flex items-center gap-1.5 max-w-[240px] truncate transition-all duration-300 cursor-pointer ${
                    isTyping 
                      ? 'border-zinc-900 bg-zinc-950 text-zinc-600 cursor-not-allowed'
                      : mode === 'assistant'
                        ? 'border-cyan-500/20 bg-cyan-950/10 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/40'
                        : 'border-purple-500/20 bg-purple-950/10 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400/40'
                  }`}
                >
                  <span className="font-sans text-[11px]">💬</span>
                  <span className="truncate">{conv.trigger}</span>
                  <ArrowRight className="w-3 h-3 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
