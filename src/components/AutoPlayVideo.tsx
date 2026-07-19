/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * High-tech holographic rectangular video player for Zoya v4.6 demonstration.
 * Autoplays smoothly when in viewport, with full browser compatibility.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Eye, VideoOff, Layers, ShieldAlert, Cpu, Maximize2 } from 'lucide-react';

interface AutoPlayVideoProps {
  videoUrl: string;
}

export default function AutoPlayVideo({ videoUrl }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct programmatic configurations to guarantee autoplay bypass on modern browsers
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;

    // Use IntersectionObserver to play/pause/restart based on scroll position
    const observerOptions = {
      root: null, // Viewport
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the video is visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Restart video from beginning when it enters view
          video.currentTime = 0;
          
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setHasError(false);
              })
              .catch((err) => {
                console.warn('Autoplay prevented or failed:', err);
                // Standard fallback (mute & play again)
                video.muted = true;
                video.play()
                  .then(() => {
                    setIsPlaying(true);
                    setHasError(false);
                  })
                  .catch(() => setHasError(true));
              });
          }
        } else {
          // Pause/stop video when scrolled out of view
          video.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [videoUrl]);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/30 border border-purple-500/30 text-purple-400 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>EXCLUSIVE SYSTEM DEMO [v4.6 BUILD]</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Zoya v4.6 Live Feature Showcase
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm font-sans leading-relaxed">
          Observe Zoya’s offline voice trigger, automated WhatsApp control sequences, real-time context-aware vision, and screen interpretation loops in action.
        </p>
      </div>

      {/* Cybernetic Widescreen Landscape Rectangular Player */}
      <div 
        ref={containerRef}
        className="w-full max-w-4xl aspect-video bg-[#050508] rounded-2xl border border-[#1a1a2e] shadow-[0_0_50px_rgba(6,182,212,0.12)] hover:shadow-[0_0_60px_rgba(147,51,234,0.18)] transition-all duration-700 relative overflow-hidden group flex flex-col justify-between"
      >
        {/* Holographic Glowing Orbs around container */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* High-tech Top Bezel Status Line */}
        <div className="h-8 border-b border-[#1a1a2e] bg-[#0f0f1a]/85 backdrop-blur-md px-4 flex items-center justify-between z-20 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">
              LIVE_FEED_PLAYER: zoya_engine_v4.6.0
            </span>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-500">
            <span className="hidden sm:inline">RESOLUTION: 1080P WIDESCREEN</span>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-purple-400 animate-spin-slow" />
              <span>DAEMON ONLINE</span>
            </div>
          </div>
        </div>

        {/* Screen Viewport with Scanline Pattern */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black select-none">
          {/* Subtle Cybernetic Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,30,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,30,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

          {/* Actual Widescreen Video - Switches to a gorgeous tech fallback if Gofile redirects are blocked by browser */}
          <video
            ref={videoRef}
            src={hasError ? "https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-lines-and-dots-background-40050-large.mp4" : videoUrl}
            className="w-full h-full object-cover pointer-events-none relative z-0"
            muted={true}
            loop={true}
            playsInline={true}
            controls={false} // Clean HUD styling with NO visible native controls timeline
            referrerPolicy="no-referrer"
            onError={() => {
              console.warn("Gofile redirect/hotlink detected or video load failed - playing aesthetic tech loop in background");
              setHasError(true);
            }}
          />

          {/* Interactive UI Screen Glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none z-10" />

          {/* Corner Tech Bracket Accents */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-500/30 pointer-events-none z-15" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30 pointer-events-none z-15" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30 pointer-events-none z-15" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-500/30 pointer-events-none z-15" />

          {/* Center Overlay if Gofile redirect block is active */}
          {hasError && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 md:p-6 text-center z-20">
              <div className="max-w-md w-full bg-[#050508]/90 border border-purple-500/40 p-5 md:p-6 rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.3)] space-y-4">
                <div className="flex items-center justify-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-5 h-5 animate-pulse text-purple-500" />
                  <span>[ALERT] GOFILE HOTLINK RESTRICTION DETECTED</span>
                </div>
                
                <div className="space-y-2 text-left font-sans text-xs md:text-[13px] text-zinc-300 leading-relaxed border-t border-b border-[#1a1a2e] py-3">
                  <p className="font-semibold text-cyan-400">
                    Bhai, Gofile ek download platform hai jo direct play block karta hai aur session cookies verify karta hai. Isliye video direct nahi chal rahi hai.
                  </p>
                  <p className="text-zinc-400">
                    Lekin iska sabse safe aur permanent solution bahut simple hai:
                  </p>
                  <ol className="list-decimal pl-4 space-y-1.5 text-zinc-400 text-xs">
                    <li>Apni video file ko <strong className="text-zinc-200">Backblaze S3</strong> par upload kijiye (jahan aapki APK hosted hai).</li>
                    <li>S3 ka direct MP4 link <strong className="text-zinc-200">App.tsx</strong> mein <code className="text-cyan-300">demoVideoUrl</code> ki jagah par daal dijiye.</li>
                  </ol>
                  <p className="text-[11px] text-purple-300 font-mono italic">
                    * S3 direct links bina kisi delay ke hamare is cybernetic player me 100% automatic scroll play karengi!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-1">
                  <a
                    href="https://gofile.io/d/d731deb8-38cc-45d7-8bbe-638c0316ac9a"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-mono font-bold text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>WATCH VIDEO ON GOFILE</span>
                  </a>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#0f0f1a] hover:bg-[#1a1a2e] text-xs font-mono text-zinc-400 hover:text-cyan-400 border border-[#1a1a2e] hover:border-cyan-500/40 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>DIRECT STREAM LINK</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {!isPlaying && !hasError && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex flex-col items-center justify-center z-15 pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center backdrop-blur-sm text-cyan-400"
              >
                <Play className="w-6 h-6 ml-1 fill-current" />
              </motion.div>
              <span className="text-[10px] font-mono text-zinc-400 mt-4 tracking-widest uppercase bg-black/75 border border-[#1a1a2e] px-3 py-1 rounded-md">
                SCROLL INTO VIEW TO STREAM LIVE
              </span>
            </div>
          )}
        </div>

        {/* High-tech Bottom Control Panel HUD bar */}
        <div className="h-8 border-t border-[#1a1a2e] bg-[#0f0f1a]/85 backdrop-blur-md px-4 flex items-center justify-between z-20 select-none">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE_SRC: GOFILE_LIVE</span>
            </span>
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center gap-2">
            <span>MUTED_AUTOPLAY: ENABLED</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* Auxiliary Note */}
      <div className="text-center font-mono text-[9px] text-zinc-600 mt-4 select-none flex items-center justify-center gap-2">
        <span>● AUTO-RESTARTS ON SCROLL ENTRY</span>
        <span>•</span>
        <span>● FULL DUPLEX AUTO-PLAYBACK</span>
      </div>
    </div>
  );
}

