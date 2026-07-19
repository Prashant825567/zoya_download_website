/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * High-tech holographic rectangular video player for Zoya v4.6 demonstration.
 * Autoplays smoothly when in viewport, with full browser compatibility.
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles, Eye, VideoOff, Layers, ShieldAlert, Cpu, Maximize2, Volume2, VolumeX } from 'lucide-react';

interface AutoPlayVideoProps {
  videoUrl: string;
}

export default function AutoPlayVideo({ videoUrl }: AutoPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true); // Start MUTED by default to guarantee autoplay bypasses security policies
  const [isPortrait, setIsPortrait] = useState<boolean>(true); // default to true since our active video is portrait

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoHeight > video.videoWidth) {
      setIsPortrait(true);
    } else {
      setIsPortrait(false);
    }
  };

  const handleContainerClick = () => {
    const video = videoRef.current;
    if (video) {
      const newMuted = !isMuted;
      video.muted = newMuted;
      setIsMuted(newMuted);
      video.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => console.warn('Interactive play failed:', err));
    }
  };

  const unmuteAndPlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      setIsMuted(false);
      video.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => console.warn('Interactive play failed:', err));
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Direct configurations to force muted autoplay (this guarantees autoplay is NEVER blocked by browsers)
    video.muted = isMuted;
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
          video.muted = isMuted;
          
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsPlaying(true);
                setHasError(false);
              })
              .catch((err) => {
                console.warn('Autoplay prevented by browser security policy:', err);
                // If even muted autoplay is blocked (very rare), we show the interactive overlay
                setIsPlaying(false);
                setHasError(false);
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
  }, [videoUrl, isMuted]);

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

      {/* Cybernetic Adaptive Video Player */}
      <div 
        ref={containerRef}
        onClick={handleContainerClick}
        className={`w-full bg-[#050508] rounded-2xl border border-[#1a1a2e] shadow-[0_0_50px_rgba(6,182,212,0.12)] hover:shadow-[0_0_60px_rgba(147,51,234,0.18)] transition-all duration-700 relative overflow-hidden group flex flex-col justify-between cursor-pointer ${
          isPortrait 
            ? "max-w-[340px] sm:max-w-[365px] aspect-[9/16]" 
            : "max-w-4xl aspect-video"
        }`}
      >
        {/* Holographic Glowing Orbs around container */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* High-tech Top Bezel Status Line */}
        <div className="h-8 border-b border-[#1a1a2e] bg-[#0f0f1a]/85 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between z-20 select-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider truncate max-w-[130px] sm:max-w-none">
              {isPortrait ? "LIVE_FEED: ZOYA_V4.6" : "LIVE_FEED_PLAYER: ZOYA_ENGINE_V4.6.0"}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[9px] font-mono text-zinc-500">
            <span>{isPortrait ? "1080x1920 PORTRAIT" : "RESOLUTION: 1080P WIDESCREEN"}</span>
            <div className="flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-400 animate-spin-slow" />
              <span>LIVE</span>
            </div>
          </div>
        </div>

        {/* Screen Viewport with Scanline Pattern */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black select-none">
          {/* Subtle Cybernetic Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,30,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,30,0.08)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />

          {/* Actual Video with Dynamic Aspect Ratio */}
          <video
            ref={videoRef}
            src={hasError ? "https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-lines-and-dots-background-40050-large.mp4" : videoUrl}
            className="w-full h-full object-cover pointer-events-none relative z-0"
            muted={isMuted}
            loop={true}
            playsInline={true}
            controls={false} // Clean HUD styling with NO visible native controls timeline
            referrerPolicy="no-referrer"
            onLoadedMetadata={handleLoadedMetadata}
            onError={() => {
              console.warn("Cloudinary video stream failed to load - playing aesthetic tech loop in background");
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

          {/* Floating interactive unmute button overlay when actively playing but muted */}
          {isPlaying && isMuted && !hasError && (
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[1.5px] flex flex-col items-center justify-center z-20 p-3 sm:p-4 text-center select-none">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[260px] bg-[#050508]/95 border border-cyan-500/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.25)] space-y-3 pointer-events-auto"
              >
                <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                  <VolumeX className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span>[VIDEO ACTIVE / AUDIO MUTED]</span>
                </div>
                
                <p className="font-semibold text-zinc-200 text-[10px] sm:text-xs">
                  Tap anywhere on the player to activate live voice stream with sound.
                </p>

                <div className="flex justify-center pt-1">
                  <button
                    onClick={unmuteAndPlay}
                    className="w-full py-2 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-[10px] sm:text-[11px] font-mono font-bold text-white rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] border border-cyan-400/20 active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-white animate-bounce" />
                    <span>TAP TO UNMUTE VOICE</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Center Overlay if Cloudinary stream fails */}
          {hasError && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px] flex flex-col items-center justify-center p-3 sm:p-4 text-center z-20 select-none">
              <div className="w-full max-w-[300px] bg-[#050508]/95 border border-purple-500/40 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.15)] space-y-3">
                <div className="flex items-center justify-center gap-1.5 text-purple-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 animate-pulse text-purple-500 shrink-0" />
                  <span>[STREAM ERROR]</span>
                </div>
                
                <div className="space-y-1.5 text-left font-sans text-[11px] sm:text-xs text-zinc-300 leading-relaxed border-t border-b border-[#1a1a2e] py-2">
                  <p className="font-semibold text-cyan-400">
                    High-fidelity video loaded, but playback blocked.
                  </p>
                  <p className="text-zinc-400 text-[10px] sm:text-xs">
                    This can happen due to strict browser security or network congestion.
                  </p>
                </div>

                <div className="flex justify-center pt-1">
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-[11px] font-mono font-bold text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(147,51,234,0.2)]"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>OPEN DIRECT LINK</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {!isPlaying && !hasError && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-[3px] flex flex-col items-center justify-center z-20 p-3 sm:p-4 text-center select-none">
              <div className="w-full max-w-[300px] bg-[#050508]/95 border border-purple-500/30 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.15)] space-y-3">
                <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                  <span>[SYSTEM READY] ZOYA DEMO</span>
                </div>
                
                <div className="space-y-1.5 text-center font-sans text-[11px] sm:text-[12px] text-zinc-300 leading-relaxed border-t border-b border-[#1a1a2e] py-2">
                  <p className="font-semibold text-white">
                    Tap to play with voice enabled
                  </p>
                  <p className="text-zinc-400 text-[10px] sm:text-xs">
                    Please tap anywhere on the player to activate live stream with direct audio.
                  </p>
                </div>

                <div className="flex justify-center pt-1">
                  <button
                    onClick={handleContainerClick}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-[11px] font-mono font-bold text-white rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(147,51,234,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-purple-400/20 active:scale-95"
                  >
                    <Play className="w-3 h-3 fill-current text-white animate-pulse" />
                    <Volume2 className="w-3 h-3 text-white animate-bounce" />
                    <span>ACTIVATE VOICE DEMO</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* High-tech Bottom Control Panel HUD bar */}
        <div className="h-8 border-t border-[#1a1a2e] bg-[#0f0f1a]/85 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between z-20 select-none">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>SOURCE_SRC: CLOUDINARY_CDN</span>
            </span>
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const video = videoRef.current;
                if (video) {
                  const newMuted = !isMuted;
                  video.muted = newMuted;
                  setIsMuted(newMuted);
                }
              }}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[#1a1a2e] hover:border-cyan-500/20 bg-[#07070d] pointer-events-auto cursor-pointer hover:text-cyan-400 transition-colors"
            >
              <span>VOICE_STREAM: {isMuted ? "MUTED" : "ACTIVE_LIVE"}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${isMuted ? "bg-amber-500 animate-pulse" : "bg-emerald-500 animate-pulse"}`} />
            </button>
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

