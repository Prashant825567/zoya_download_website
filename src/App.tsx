/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Volume2, Languages, Heart, Eye, Sparkles, Cpu, Database, 
  Shield, Sliders, Download, Smartphone, Check, Activity, Code, 
  SlidersHorizontal, Terminal, Settings, ExternalLink, Lock, Unlock, 
  ArrowRight, Play, Menu, X, ChevronDown, Info, BatteryCharging, 
  FileDown, FolderDown, ShieldAlert
} from 'lucide-react';

import { ZOYA_FEATURES, AUTOMATION_CATEGORIES } from './data';
import NeuralLock from './components/NeuralLock';
import ChatSimulator from './components/ChatSimulator';
import AutoPlayVideo from './components/AutoPlayVideo';
import zoyaNeuralCore from './assets/images/zoya_neural_core_1784455939507.jpg';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'features' | 'automation' | 'installation'>('features');
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // APK Links
  const apkUrl = "https://docs.google.com/uc?export=download&id=1uMSg7df_mMxyG0TIqzX6JqWnE54o5lOV";
  const demoVideoUrl = "https://res.cloudinary.com/jeiv3ze2/video/upload/v1784806887/Untitled_video_3_ls9ybw.mp4";

  // Synthesize sound for button clicks
  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // Ignored
    }
  };

  const toggleFaq = (index: number) => {
    playClickSound();
    setFaqOpen(faqOpen === index ? null : index);
  };

  const handleTabChange = (tab: 'features' | 'automation' | 'installation') => {
    playClickSound();
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top ambient glow overlays */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-cyan-950/15 via-purple-950/5 to-transparent pointer-events-none" />

      {/* Primary Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#050508]/85 backdrop-blur-md border-b border-[#1a1a2e] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#1a1a2e] bg-[#0f0f1a] flex items-center justify-center">
              <img 
                src={zoyaNeuralCore} 
                alt="Zoya Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-[spin_50s_linear_infinite]"
              />
              <div className="absolute inset-0 bg-cyan-400/5 backdrop-blur-[1px]" />
            </div>
            <div>
              <span className="font-display font-extrabold tracking-wider text-sm sm:text-base bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ZOYA AI
              </span>
              <span className="text-[9px] font-mono font-semibold text-zinc-500 ml-1.5 px-1 py-0.5 rounded bg-[#0f0f1a] border border-[#1a1a2e] uppercase">
                v4.8
              </span>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-zinc-400">
            <a href="#how-it-works" onClick={playClickSound} className="hover:text-cyan-400 transition-colors">HOW IT WORKS</a>
            <a href="#features-grid" onClick={playClickSound} className="hover:text-cyan-400 transition-colors">CAPABILITIES</a>
            <a href="#automation-table" onClick={playClickSound} className="hover:text-purple-400 transition-colors">26+ ACTIONS</a>
            <a href="#chat-sim" onClick={playClickSound} className="hover:text-cyan-400 transition-colors">TEST DRIVE</a>
            <a href="#security-info" onClick={playClickSound} className="hover:text-purple-400 transition-colors">SECURITY</a>
          </nav>

          {/* Right Download CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isUnlocked && (
              <a
                id="nav-btn-download"
                href={apkUrl}
                download
                onClick={playClickSound}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-xs font-mono font-bold text-black hover:opacity-90 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD APK</span>
              </a>
            )}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0f0f1a] border border-[#1a1a2e]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-400 uppercase">ONLINE</span>
            </div>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg bg-[#0f0f1a] border border-[#1a1a2e] text-zinc-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu tray */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#050508] border-b border-[#1a1a2e] px-4 py-4 space-y-4 font-mono text-xs tracking-wider"
            >
              <a href="#how-it-works" onClick={() => { setMobileMenuOpen(false); playClickSound(); }} className="block py-2 text-zinc-400 hover:text-cyan-400">HOW IT WORKS</a>
              <a href="#features-grid" onClick={() => { setMobileMenuOpen(false); playClickSound(); }} className="block py-2 text-zinc-400 hover:text-cyan-400">CAPABILITIES</a>
              <a href="#automation-table" onClick={() => { setMobileMenuOpen(false); playClickSound(); }} className="block py-2 text-zinc-400 hover:text-purple-400">26+ ACTIONS</a>
              <a href="#chat-sim" onClick={() => { setMobileMenuOpen(false); playClickSound(); }} className="block py-2 text-zinc-400 hover:text-cyan-400">TEST DRIVE</a>
              <a href="#security-info" onClick={() => { setMobileMenuOpen(false); playClickSound(); }} className="block py-2 text-zinc-400 hover:text-purple-400">SECURITY</a>
              {isUnlocked && (
                <a
                  href={apkUrl}
                  download
                  onClick={() => { setMobileMenuOpen(false); playClickSound(); }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold text-center cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD DIRECT APK
                </a>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Dynamic Workspace Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            
            /* SECURE PADLOCK GATE (THE 3D LOCK EXPERIENCE) */
            <motion.div
              key="gate"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              <NeuralLock 
                isUnlocked={isUnlocked} 
                onUnlock={() => {
                  setIsUnlocked(true);
                  // Scroll to main content smoothly
                  setTimeout(() => {
                    const el = document.getElementById('main-dashboard');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }} 
              />
            </motion.div>
          ) : (
            
            /* THE COMPLETE UNLOCKED POWER PLATFORM */
            <motion.div
              id="main-dashboard"
              key="dashboard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', damping: 25 }}
              className="py-6 space-y-24"
            >
              
              {/* SECTION 1: HERO METRICS & INSTANT DOWNLOAD CONTAINER */}
              <section className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual Intro Headline */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-950/20 text-purple-400 text-xs font-mono tracking-wider animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>INDIA'S FIRST BILINGUAL VOICE AI ENGINE</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1] md:leading-none">
                    Your Voice.<br />
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 bg-clip-text text-transparent">
                      Her Mind.
                    </span><br />
                    Complete Automation.
                  </h1>

                  <p className="text-zinc-400 text-sm md:text-base font-sans leading-relaxed">
                    Zoya isn't just another voice command log. Operating on an always-on <strong>Vosk AI wake engine</strong> and backed by Gemini Live architectures, she controls system functions, WhatsApp threads, screen contents, and visual generations completely from background states.
                  </p>

                  {/* Dual Modes Quick Glance */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl border border-[#1a1a2e] bg-[#0f0f1a]/50 backdrop-blur-sm flex items-start gap-3">
                      <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 mt-1 shrink-0">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">Ji Boss! 👔 Mode</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal">System actions, automation, flashlight control, location searches, and text scripts.</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-[#1a1a2e] bg-[#0f0f1a]/50 backdrop-blur-sm flex items-start gap-3">
                      <div className="p-2 rounded bg-purple-500/10 text-purple-400 mt-1 shrink-0">
                        <Heart className="w-4 h-4 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">haan jaan ❤️ Mode</h4>
                        <p className="text-[11px] text-zinc-500 leading-normal">Emotional intelligence, caring responses, daily greeting logs, scenic visual assets, and stress support.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct APK Download Dashboard Panel */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm rounded-3xl border border-[#1a1a2e] bg-[#0f0f1a] p-6 md:p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden">
                    
                    {/* Corner accents */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none" />

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-[#050508] px-2.5 py-1 rounded-md border border-[#1a1a2e] text-[10px] font-mono text-zinc-400">
                          <span>RELEASE BUILD</span>
                        </div>
                        <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/30 border border-cyan-800/30 px-2 py-0.5 rounded">
                          v4.8 (Stable)
                        </span>
                      </div>

                      <div className="space-y-2 text-left">
                        <h3 className="text-lg font-display font-bold text-white">Download Zoya Core</h3>
                        <p className="text-xs text-zinc-500 leading-normal">
                          Install India's premier background automation assistant on your Android device. 100% secure, zero background lag, optimized battery profiles.
                        </p>
                      </div>

                      {/* Download metrics */}
                      <div className="grid grid-cols-3 gap-2 border-y border-[#1a1a2e] py-4 font-mono text-center">
                        <div>
                          <span className="block text-[10px] text-zinc-600 uppercase">FILE SIZE</span>
                          <span className="text-xs font-bold text-zinc-300">18.4 MB</span>
                        </div>
                        <div className="border-x border-[#1a1a2e]">
                          <span className="block text-[10px] text-zinc-600 uppercase">PLATFORM</span>
                          <span className="text-xs font-bold text-zinc-300">Android 8+</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-zinc-600 uppercase">MD5</span>
                          <span className="text-xs font-bold text-zinc-300">Verified</span>
                        </div>
                      </div>

                      {/* Main Download Button */}
                      <a
                        id="btn-apk-download-hero"
                        href={apkUrl}
                        download
                        onClick={playClickSound}
                        className="group w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-500 text-black font-mono font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] cursor-pointer"
                      >
                        <FileDown className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                        <span>DOWNLOAD ZOYA APK</span>
                      </a>

                      {/* Alternative installation notes snippet */}
                      <div className="flex items-start gap-2 text-[10px] text-zinc-500 text-left bg-[#050508]/40 p-3 rounded-lg border border-[#1a1a2e]">
                        <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span>Requires standard Accessibility and Microphone permissions to perform automated WhatsApp chats and background wake word listening.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: SCROLL AUTOPLAY VIDEO DEMO */}
              <section id="how-it-works" className="scroll-mt-20">
                <AutoPlayVideo videoUrl={demoVideoUrl} />
              </section>

              {/* SECTION 3: INTERACTIVE CHAT SIMULATOR */}
              <section id="chat-sim" className="scroll-mt-20 border-t border-zinc-900 pt-16">
                <ChatSimulator />
              </section>

              {/* SECTION 4: BENTO FEATURE GRAPH */}
              <section id="features-grid" className="scroll-mt-20 border-t border-[#1a1a2e] pt-16 text-left">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800/40 text-cyan-400 text-xs font-mono">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>SYSTEM FEATURES & CAPABILITIES</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                    Engineered to Dominate
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-base font-sans">
                    Zoya v4.8 is packed with dual architectures, local neural listeners, and smart accessibility interfaces that replace traditional tap-heavy flows with instant voice automation.
                  </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ZOYA_FEATURES.map((feature) => (
                    <div 
                      key={feature.id}
                      className="group p-6 rounded-2xl border border-[#1a1a2e] bg-[#0f0f1a]/60 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:border-zinc-800/80 hover:bg-[#0f0f1a]"
                    >
                      {/* Gradient Hover Glow lines */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-[#050508] border border-[#1a1a2e] text-cyan-400 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all duration-300 shrink-0">
                          {feature.icon === 'Mic' && <Mic className="w-5 h-5" />}
                          {feature.icon === 'Volume2' && <Volume2 className="w-5 h-5" />}
                          {feature.icon === 'Languages' && <Languages className="w-5 h-5" />}
                          {feature.icon === 'Heart' && <Heart className="w-5 h-5" />}
                          {feature.icon === 'Eye' && <Eye className="w-5 h-5" />}
                          {feature.icon === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                          {feature.icon === 'Cpu' && <Cpu className="w-5 h-5" />}
                          {feature.icon === 'Database' && <Database className="w-5 h-5" />}
                          {feature.icon === 'Shield' && <Shield className="w-5 h-5" />}
                          {feature.icon === 'Sliders' && <Sliders className="w-5 h-5" />}
                          {feature.icon === 'Settings' && <Settings className="w-5 h-5" />}
                          {feature.icon === 'Activity' && <Activity className="w-5 h-5" />}
                        </div>

                        {feature.badge && (
                          <span className="text-[9px] font-mono font-bold tracking-widest text-purple-400 bg-purple-950/20 border border-purple-900/30 px-2.5 py-0.5 rounded-full uppercase">
                            {feature.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-mono font-bold text-zinc-100 group-hover:text-cyan-400 uppercase tracking-wider mb-2 transition-colors">
                        {feature.title}
                      </h4>

                      <p className="text-zinc-500 text-xs font-sans leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 5: THE 26+ AUTOMATION ACTIONS MATRIX */}
              <section id="automation-table" className="scroll-mt-20 border-t border-[#1a1a2e] pt-16 text-left">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/30 border border-purple-800/40 text-purple-400 text-xs font-mono">
                    <Activity className="w-3.5 h-3.5" />
                    <span>26+ HARDWARE & ACCESSIBILITY ACTIONS</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-tight">
                    Complete Phone Control
                  </h2>
                  <p className="text-zinc-400 text-sm md:text-base font-sans">
                    With Zoya, your phone's complete system is exposed to your voice. No other assistant performs direct UI interactions inside third-party applications.
                  </p>
                </div>

                {/* Bento layout for Categories of Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {AUTOMATION_CATEGORIES.map((categoryObj, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl border border-[#1a1a2e] bg-[#0f0f1a]/40 hover:border-zinc-800/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-4 border-b border-[#1a1a2e] pb-3">
                        <div className="w-1.5 h-3.5 bg-cyan-400 rounded-sm" />
                        <h4 className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                          {categoryObj.category}
                        </h4>
                      </div>

                      <ul className="space-y-3">
                        {categoryObj.actions.map((act, actIdx) => (
                          <li key={actIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-cyan-400 mt-0.5 select-none font-mono">»</span>
                            <span className="leading-relaxed">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 6: BACKGROUND SERVICE & SECURITY ANALYSIS */}
              <section id="security-info" className="scroll-mt-20 border-t border-[#1a1a2e] pt-16 text-left">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#0f0f1a]/60 border border-[#1a1a2e] rounded-3xl p-6 sm:p-10 relative overflow-hidden">
                  
                  {/* Backdrop glow */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[120px] pointer-events-none" />

                  {/* Left explanation text */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050508] border border-[#1a1a2e] text-zinc-400 text-[10px] font-mono">
                      <Shield className="w-3.5 h-3.5 text-cyan-400" />
                      <span>OFFLINE ENCRYPTED BACKGROUND DAEMON</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white tracking-tight">
                      Is Zoya Secure?<br />
                      Let's Talk Architecture.
                    </h3>

                    <p className="text-zinc-400 text-xs md:text-sm font-sans leading-relaxed">
                      Zoya operates on a hybrid local/cloud system. To listen for the wake-word <strong>"Zoya"</strong>, she initializes a <strong>local Vosk AI speech library</strong> completely on-device. Your voice recording never leaves your phone during background standby.
                    </p>

                    <div className="space-y-4 font-sans text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center shrink-0 text-cyan-400 font-mono mt-0.5">
                          1
                        </div>
                        <div>
                          <h5 className="font-bold text-zinc-200">Offline Standby Mode</h5>
                          <p className="text-zinc-500 mt-0.5">The Vosk speech model is compiled into the APK, allowing standby listening even without internet.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-950/40 border border-purple-800/30 flex items-center justify-center shrink-0 text-purple-400 font-mono mt-0.5">
                          2
                        </div>
                        <div>
                          <h5 className="font-bold text-zinc-200">Accessibility Service Security</h5>
                          <p className="text-zinc-500 mt-0.5">Automated clicks (WhatsApp) run purely via secure system APIs. No telemetry logs are uploaded or shared.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-950/40 border border-cyan-800/30 flex items-center justify-center shrink-0 text-cyan-400 font-mono mt-0.5">
                          3
                        </div>
                        <div>
                          <h5 className="font-bold text-zinc-200">Auto-Restart & Battery Saving</h5>
                          <p className="text-zinc-500 mt-0.5">Smart timeout terminates the process after 30 seconds of inactivity to keep your battery cold and healthy.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Technical specs mock terminal */}
                  <div className="lg:col-span-5 bg-[#050508] border border-[#1a1a2e] rounded-2xl p-5 font-mono text-[10px] text-zinc-500 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1a1a2e] pb-2">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-zinc-300 font-bold">ZOYA.DAEMON.CONFIG</span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="space-y-1.5 text-left text-[9px]">
                      <div>$ sysctl init zoya_daemon</div>
                      <div className="text-zinc-400">[DAEMON] Loading local Vosk-API model... OK (12.4MB)</div>
                      <div className="text-zinc-400">[DAEMON] Accessibility service active: TRUE</div>
                      <div className="text-zinc-400">[DAEMON] Battery saving threshold: enabled (0.01mA sleep)</div>
                      <div className="text-zinc-400">[DAEMON] Background listener priority: HIGH (No Kill Notification)</div>
                      <div>$ zoya-wake --test</div>
                      <div className="text-cyan-400">[VOSK] Listening for 'Zoya' frequency bands [80-350Hz]</div>
                      <div className="text-purple-400">[GEMINI] Interactions API initialized server-side</div>
                      <div>$ status --zoya-v4.8</div>
                      <div className="text-emerald-400">STATUS: CORE RUNNING OPTIMIZED ✓</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 7: DETAILED FREQUENTLY ASKED QUESTIONS */}
              <section id="faq" className="border-t border-[#1a1a2e] pt-16 text-left max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-2xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm font-sans mt-2">
                    Everything you need to know about setting up and running Zoya v4.8 on your phone.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      q: "How does the background wake word 'Zoya' work even when locked?",
                      a: "Zoya embeds a compact, offline speech acoustic engine powered by Vosk. It runs inside a persistent Android Foreground Service. This keeps the microphone streaming safely in low-priority cycles, responding immediately when you speak 'Zoya' without needing an active internet response."
                    },
                    {
                      q: "Is installing an APK safe? My phone gave an 'Unknown Source' alert.",
                      a: "Yes! Since Zoya is a personal project and includes core phone automation (like flashlight and camera commands), Google Play Store may label offline automation tools as 'Unknown'. Zoya is 100% safe, free of trackers, and operates with secure API keys."
                    },
                    {
                      q: "How do I configure Boyfriend Mode ('haan jaan ❤️')?",
                      a: "Open Zoya, click on the Settings gear icon, and click 'Personality Mode'. Toggle from 'Assistant Mode' to 'Girlfriend Mode'. Zoya will immediately reboot her response database to speak in a loving, caring, and romantic manner."
                    },
                    {
                      q: "How does Zoya automatically type and send messages on WhatsApp?",
                      a: "Zoya utilizes Android's official Accessibility Services to find contacts, click input fields, type text strings, and hit 'Send' on your behalf. This allows 100% hands-free communication while driving or working."
                    }
                  ].map((faq, i) => (
                    <div 
                      key={i} 
                      className="border border-[#1a1a2e] bg-[#0f0f1a]/40 rounded-xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        id={`faq-btn-${i}`}
                        onClick={() => toggleFaq(i)}
                        className="w-full py-4 px-5 text-left flex items-center justify-between text-xs sm:text-sm font-mono font-bold text-white hover:bg-[#0f0f1a]/40 transition-colors cursor-pointer"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-300 ${faqOpen === i ? 'rotate-180 text-purple-400' : ''}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {faqOpen === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-[#1a1a2e] bg-[#050508]/80 px-5 py-4 text-xs text-zinc-400 font-sans leading-relaxed"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 8: STEP-BY-STEP APK INSTALLATION GUIDE */}
              <section id="installation-guide" className="border-t border-[#1a1a2e] pt-16 text-left max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-[#0f0f1a] to-[#050508] border border-[#1a1a2e] rounded-3xl p-6 md:p-8 space-y-6">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-cyan-400 animate-spin-slow" />
                    <h3 className="text-xl font-display font-extrabold text-white">Installation & Setup Guide</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans">
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-cyan-400">STEP 1</div>
                      <h5 className="text-xs font-bold text-zinc-200">Download the APK</h5>
                      <p className="text-[11px] text-zinc-500 leading-normal">Click the direct download button to save the Zoya_V_4.8.apk package file to your phone.</p>
                    </div>

                    <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1a1a2e] pt-4 md:pt-0 md:pl-6">
                      <div className="text-xs font-mono font-bold text-purple-400">STEP 2</div>
                      <h5 className="text-xs font-bold text-zinc-200">Allow Unknown Sources</h5>
                      <p className="text-[11px] text-zinc-500 leading-normal">Go to Settings &gt; Security &gt; enable 'Install from Unknown Sources' in your web browser or file manager.</p>
                    </div>

                    <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1a1a2e] pt-4 md:pt-0 md:pl-6">
                      <div className="text-xs font-mono font-bold text-cyan-400">STEP 3</div>
                      <h5 className="text-xs font-bold text-zinc-200">Accessibility Service</h5>
                      <p className="text-[11px] text-zinc-500 leading-normal">To automate WhatsApp, enable 'Zoya Accessibility Service' in your device Accessibility Settings.</p>
                    </div>

                    <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#1a1a2e] pt-4 md:pt-0 md:pl-6">
                      <div className="text-xs font-mono font-bold text-purple-400">STEP 4</div>
                      <h5 className="text-xs font-bold text-zinc-200">Wake Word & Wake Up</h5>
                      <p className="text-[11px] text-zinc-500 leading-normal">Grant microphone access, then say "Zoya" to activate your AI companion at any time.</p>
                    </div>
                  </div>
                </div>
              </section>



            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Minimal Footer */}
      <footer className="bg-[#050508] border-t border-[#1a1a2e] py-10 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center font-mono text-[10px] text-zinc-600 space-y-2 select-none pointer-events-none">
          <p>© 2026 ZOYA AI SYSTEMS. ALL RIGHTS RESERVED.</p>
          <p className="tracking-wide">COMPILATION BUILD 4.8.0-RELEASE • CORE INTELLIGENCE ARCHITECTURE</p>
          <div className="flex justify-center gap-4 text-zinc-500 pt-1">
            <span>VOSK AI ENGINE</span>
            <span>•</span>
            <span>GEMINI LIVE INTEGRATION</span>
            <span>•</span>
            <span>ACCESSIBILITY PIPELINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
