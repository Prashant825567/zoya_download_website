/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Cpu, ShieldAlert, Sparkles, Key, AlertCircle, RefreshCw } from 'lucide-react';
import zoyaNeuralCore from '../assets/images/zoya_neural_core_1784455939507.jpg';

interface NeuralLockProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export default function NeuralLock({ onUnlock, isUnlocked }: NeuralLockProps) {
  const [sliderVal, setSliderVal] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [decryptProgress, setDecryptProgress] = useState<number>(0);
  const [decryptStatus, setDecryptStatus] = useState<'locked' | 'decrypting' | 'unlocked'>('locked');
  const [errorLog, setErrorLog] = useState<string>('');
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  // Play custom synthesized audio cues using Web Audio API
  const playSciFiSound = (type: 'beep' | 'powerup' | 'unlock' | 'error') => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = ctx.currentTime;
      
      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'powerup') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(950, now + 0.6);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'unlock') {
        // High-tech ascending chord
        const freqs = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 (Warm Major Chord)
        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now + idx * 0.08);
          gain.gain.setValueAtTime(0.05, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.5);
        });
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.3);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      console.warn('Audio Context blocked or not supported yet', e);
    }
  };

  const handleSliderDown = () => {
    isDragging.current = true;
    playSciFiSound('beep');
  };

  const handleSliderMove = (clientX: number) => {
    if (!isDragging.current || !sliderRef.current || decryptStatus !== 'locked') return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.round((x / rect.width) * 100);
    setSliderVal(percentage);

    if (percentage % 15 === 0) {
      playSciFiSound('beep');
    }

    if (percentage >= 95) {
      isDragging.current = false;
      setSliderVal(100);
      triggerDecryption();
    }
  };

  const triggerDecryption = () => {
    setDecryptStatus('decrypting');
    playSciFiSound('powerup');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      if (progress >= 100) {
        clearInterval(interval);
        setDecryptProgress(100);
        setTimeout(() => {
          setDecryptStatus('unlocked');
          playSciFiSound('unlock');
          setTimeout(() => {
            onUnlock();
          }, 800);
        }, 300);
      } else {
        setDecryptProgress(progress);
        if (progress % 20 === 0) {
          playSciFiSound('beep');
        }
      }
    }, 80);
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      if (sliderVal < 95) {
        // Snap back
        setSliderVal(0);
        playSciFiSound('error');
      }
    }
  };

  useEffect(() => {
    const handleGlobalUp = () => handleMouseUp();
    const handleGlobalMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleSliderMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchend', handleGlobalUp);
    window.addEventListener('touchmove', handleGlobalTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [sliderVal, decryptStatus]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden py-10 bg-[#050508]">
      {/* Visual Ambience Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none animate-orb-float-1" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[140px] pointer-events-none animate-orb-float-2" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(5,5,8,0)_95%,rgba(6,182,212,0.03)_95%),linear-gradient(90deg,rgba(5,5,8,0)_95%,rgba(6,182,212,0.03)_95%)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

      <div className="z-10 text-center max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4 tracking-wider"
        >
          <Cpu className="w-3.5 h-3.5 animate-spin-slow" />
          <span>ZOYA NEURAL CORE v4.6 ESTABLISHED</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent mb-4"
        >
          Secure Neural Decryptor
        </motion.h1>

        <p className="text-zinc-400 text-sm md:text-base font-sans leading-relaxed">
          Zoya is a secure, high-tech bilingual personal assistant with complete phone automation and Girlfriend mode. Unlock the neural key below to access direct download packages, visual demos, and full capability matrices.
        </p>
      </div>

      {/* Futuristic 3D Floating Lock Orbit */}
      <div className="relative z-10 w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-10">
        {/* Orbit Ring 1 - 3D skewed */}
        <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/20 animate-[spin_40s_linear_infinite]" style={{ transform: 'rotateX(55deg) rotateY(15deg)' }} />
        
        {/* Orbit Ring 2 - Opposite skew */}
        <div className="absolute inset-2 rounded-full border border-cyan-500/10 animate-[spin_25s_linear_infinite_reverse]" style={{ transform: 'rotateX(-45deg) rotateY(-30deg)' }} />

        {/* Orbit Ring 3 - Horizontal floating ring */}
        <div className="absolute inset-6 rounded-full border border-purple-500/20 animate-[spin_15s_linear_infinite]" style={{ transform: 'rotateX(75deg)' }} />

        {/* Core Outer Shield Container */}
        <motion.div 
          className="relative w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center bg-[#0f0f1a] border border-[#1a1a2e] backdrop-blur-md shadow-2xl"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Neon Glow Circle */}
          <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
            decryptStatus === 'decrypting' 
              ? 'bg-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.5)]' 
              : decryptStatus === 'unlocked'
                ? 'bg-purple-500/20 shadow-[0_0_60px_rgba(147,51,234,0.6)]'
                : isHovered 
                  ? 'bg-cyan-500/10 shadow-[0_0_35px_rgba(6,182,212,0.3)]' 
                  : 'bg-transparent shadow-none'
          }`} />

          {/* Glowing particle rings inside */}
          <div className="absolute inset-3 rounded-full border-[#1a1a2e] animate-pulse-glow" />

          {/* Core Logo Image - Neural Core */}
          <div className="absolute inset-6 rounded-full overflow-hidden border-2 border-[#1a1a2e] flex items-center justify-center bg-[#050508]">
            <img 
              src={zoyaNeuralCore} 
              alt="Zoya Core" 
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover opacity-85 transition-transform duration-1000 ${
                decryptStatus === 'decrypting' ? 'scale-110 animate-[spin_5s_linear_infinite]' : 'animate-[spin_45s_linear_infinite]'
              }`}
            />
          </div>

          {/* Central Interactive Digital Status */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/20 rounded-full">
            <motion.div
              animate={{ 
                scale: decryptStatus === 'decrypting' ? [1, 1.2, 1] : 1,
              }}
              transition={{ repeat: Infinity, duration: 1 }}
              className={`p-4 rounded-full bg-[#050508]/90 backdrop-blur-md border ${
                decryptStatus === 'unlocked'
                  ? 'border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  : decryptStatus === 'decrypting'
                    ? 'border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'border-[#1a1a2e] text-zinc-400'
              }`}
            >
              <AnimatePresence mode="wait">
                {decryptStatus === 'locked' && (
                  <motion.div
                    key="locked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Lock className="w-8 md:w-10 md:h-10 text-cyan-400 h-8" />
                  </motion.div>
                )}
                {decryptStatus === 'decrypting' && (
                  <motion.div
                    key="decrypting"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex flex-col items-center"
                  >
                    <RefreshCw className="w-8 md:w-10 md:h-10 h-8 animate-spin text-cyan-400" />
                  </motion.div>
                )}
                {decryptStatus === 'unlocked' && (
                  <motion.div
                    key="unlocked"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                  >
                    <Unlock className="w-8 md:w-10 md:h-10 h-8 text-purple-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating decryption text indicator */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center text-center">
          <div className="px-3 py-1 rounded bg-[#0f0f1a] border border-[#1a1a2e] text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
            {decryptStatus === 'locked' && "SYSTEM CORE LOCK: SECURED"}
            {decryptStatus === 'decrypting' && `DECRYPTING CORE: ${decryptProgress}%`}
            {decryptStatus === 'unlocked' && "NEURAL LINK ESTABLISHED"}
          </div>
        </div>
      </div>

      {/* Swipe/Click Control Panel */}
      <div className="relative z-10 w-full max-w-sm px-4">
        <AnimatePresence mode="wait">
          {decryptStatus === 'locked' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Swipe Slider Track */}
              <div 
                ref={sliderRef}
                className="relative w-full h-14 rounded-full bg-[#0f0f1a] border border-[#1a1a2e] p-1 select-none cursor-ew-resize flex items-center justify-between"
                onMouseDown={(e) => {
                  handleSliderDown();
                  handleSliderMove(e.clientX);
                }}
                onTouchStart={(e) => {
                  if (e.touches.length > 0) {
                    handleSliderDown();
                    handleSliderMove(e.touches[0].clientX);
                  }
                }}
              >
                {/* Swipe Glow Track */}
                <div 
                  className="absolute left-1 top-1 bottom-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-r border-cyan-400/30 transition-all duration-75"
                  style={{ width: `calc(${sliderVal}% - 4px)`, minWidth: '40px' }}
                />

                {/* Draggable Thumb */}
                <motion.div 
                  className="z-10 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 text-zinc-950 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-grab active:cursor-grabbing"
                  style={{ x: `${(sliderVal / 100) * (sliderRef.current ? sliderRef.current.clientWidth - 56 : 0)}px` }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Key className="w-5 h-5 text-zinc-950" />
                </motion.div>

                {/* Inner track text */}
                <span className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold tracking-widest text-zinc-500 pointer-events-none select-none uppercase">
                  SWIPE KEY TO UNLOCK
                </span>
                
                <span className="z-0 text-zinc-400 text-xs font-mono font-bold ml-auto pr-6 pointer-events-none select-none">
                  {sliderVal}%
                </span>
              </div>

              {/* Or manual quick click bypass */}
              <button 
                id="btn-bypass-decrypt"
                onClick={triggerDecryption}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 border-b border-dashed border-cyan-500/30 hover:border-cyan-400/80 pb-0.5"
              >
                <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                Bypass decryption: Click to unlock core
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center"
            >
              {/* Progress bar container */}
              <div className="w-full bg-[#0f0f1a] border border-[#1a1a2e] rounded-full h-4 overflow-hidden p-0.5 mb-2">
                <motion.div 
                  className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 h-full rounded-full shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${decryptProgress}%` }}
                />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                <span className="animate-pulse">●</span>
                <span>
                  {decryptStatus === 'decrypting' ? 'INJECTING NEURAL AWAKENING OVERLAYS...' : 'DECRYPTION COMPLETE. BOOTING ZOYA...'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cyberpunk logs corner */}
      <div className="absolute bottom-4 left-4 hidden lg:block font-mono text-[9px] text-zinc-600 space-y-0.5 max-w-xs text-left pointer-events-none select-none">
        <div>[SYS] INITIALIZING VOSK AUDIO_STREAM ... SUCCESS</div>
        <div>[SYS] ACCESSIBILITY INTERACTION PROTOCOL ... LOADED</div>
        <div>[SYS] GEMINI_LIVE SECURE PROXY ... STABLE</div>
        <div>[SYS] PORT_ROUTE: HTTPS INGRESS PORT 3000</div>
        <div>[SYS] VERSION: 4.6 (STABLE) - ARCH: ARM64</div>
      </div>
    </div>
  );
}
