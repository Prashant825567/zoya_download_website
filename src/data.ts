/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeatureCard, AutomationAction } from './types';

export const ZOYA_FEATURES: FeatureCard[] = [
  {
    id: 'voice-wake',
    title: 'Voice Wake Word Detection',
    description: 'Always-listening local voice processing powered by a custom offline-optimized Vosk AI engine. Instantly wakes Zoya even when your phone is locked or screen is off with standard microphone permissions. Includes smart barge-in support so you can interrupt or speak over her at any moment without needing to wait.',
    icon: 'Mic',
    category: 'core',
    badge: 'Always Listening'
  },
  {
    id: 'voice-chat',
    title: 'Real-Time Voice Chat',
    description: 'India\'s First Hindi + English Voice AI Assistant with Gemini Live! Experience seamless, ultra-low-latency real-time voice conversations with simultaneous Audio Input and Output streaming. Choose your custom language preference or speak fluently in mixed Hinglish with high-fidelity accent recognition.',
    icon: 'Volume2',
    category: 'core',
    badge: 'Gemini Live'
  },
  {
    id: 'personality',
    title: 'Two Personality Modes',
    description: 'Toggle between two distinctive interactive spirits. Choose "Assistant Mode" for clean, professional operations ("Ji Boss 👔" style) to execute system jobs, or switch to the exclusive "Girlfriend Mode" ("haan jaan ❤️" style) for sweet, romantic companionships, caring conversations, and emotional companionship.',
    icon: 'Heart',
    category: 'intelligence',
    badge: 'Girlfriend Mode'
  },
  {
    id: 'phone-auto',
    title: 'Complete Phone Automation',
    description: 'Execute 26+ pre-programmed system actions entirely hand-free. Control hardware functions, search the web via Tavily, automatically type messages, or open and configure external applications with single voice requests. True automation that removes manual tap overhead.',
    icon: 'Cpu',
    category: 'automation',
    badge: '26+ Actions'
  },
  {
    id: 'vision',
    title: 'Vision & Screen Analysis',
    description: 'Real-time screen understanding at your fingertips. Capture your active workspace or stream your mobile camera feed directly to Gemini Vision. Zoya semantically analyzes the screen content, explaining complex UI charts, verifying objects, reading small fonts, and answering contextual queries instantly.',
    icon: 'Eye',
    category: 'intelligence',
    badge: 'Screen Vision'
  },
  {
    id: 'image-gen',
    title: 'AI Image Generation',
    description: 'Transform voice ideas into stunning high-definition custom images on the fly. Simply describe what you want to see, and Zoya triggers text-to-image synthesis, displaying your custom creation in a beautiful floating glassmorphic dashboard overlay.',
    icon: 'Sparkles',
    category: 'intelligence',
    badge: 'Text-to-Image'
  },
  {
    id: 'history',
    title: 'Secure Cloud & Chat History',
    description: 'All conversations and automated transcripts are fully backed up to cloud systems or Telegram archives. Effortlessly browse and search through your complete dialog logs in an elegantly animated history screen, with a one-click "Clear History" option for instant privacy control.',
    icon: 'Database',
    category: 'system',
    badge: 'Cloud Sync'
  },
  {
    id: 'premium-ui',
    title: 'Premium UI & Animations',
    description: 'Featuring an immersive cyberpunk design with a dynamic splash screen, 3D smartphone mockups, holographic glow text, orbital rings, and glowing orbs. The gradient-tinted chat bubbles, slide-in viewport transitions, shimmer effects, status indicators, and pulsing particles provide a gorgeous luxury aesthetic.',
    icon: 'Activity',
    category: 'ui',
    badge: 'Cyberpunk 3D'
  },
  {
    id: 'background-service',
    title: 'Persistent Background Daemon',
    description: 'A robust low-level always-on background service with a persistent notification layer to prevent OS-level system kills. Features an automatic 30-second inactive sleep mode for maximum battery life optimization, and auto-recovers gracefully from memory restarts or low battery cycles.',
    icon: 'Shield',
    category: 'system',
    badge: 'Always Stable'
  },
  {
    id: 'audio-features',
    title: 'Advanced Audio Streaming',
    description: 'Engineered with premium duplex real-time streaming pipelines that handle concurrent audio feeds. Includes an instant barge-in interrupt sensor that halts speech output the moment you start speaking, backed by an offline TTS (Text-to-Speech) fallback for reliable local voice playback.',
    icon: 'Languages',
    category: 'core',
    badge: 'Duplex Stream'
  },
  {
    id: 'settings-control',
    title: 'Deep Settings & Preferences',
    description: 'Configure and tune Zoya to match your workflow. Instantly toggle background service daemons on or off, set microphone input threshold sensitivities, pick your default primary and response languages, and customize personality presets directly from a clean control panel.',
    icon: 'Settings',
    category: 'system',
    badge: 'Full Settings'
  },
  {
    id: 'accessibility',
    title: 'Accessibility WhatsApp Automation',
    description: 'Harnesses Android\'s low-level Accessibility Service API to automate typing and WhatsApp tasks. Zoya physically searches contacts, types complex messages, scrolls through chats, and clicks send triggers on your behalf, offering true hands-free communication.',
    icon: 'Sliders',
    category: 'automation',
    badge: 'WhatsApp Auto'
  }
];

export const AUTOMATION_CATEGORIES: AutomationAction[] = [
  {
    category: 'Communication',
    actions: ['WhatsApp message bhejna automatically', 'Contact search & auto-selection', 'Smart message typing via Accessibility']
  },
  {
    category: 'Device Control',
    actions: ['Flashlight on/off command', 'Volume adjustment (Up, Down, Mute)', 'Screen Brightness adjustment']
  },
  {
    category: 'Camera',
    actions: ['Camera app open karna', 'Camera focus aur automated capture karna', 'Selfie camera launch']
  },
  {
    category: 'Navigation',
    actions: ['Home screen par navigate karna', 'Google Search results display', 'Direct YouTube video play']
  },
  {
    category: 'Apps',
    actions: ['Open any installed app instantly', 'Toggle settings drawer', 'Manage background apps']
  },
  {
    category: 'System Info',
    actions: ['Battery status reporting', 'Device CPU & hardware details', 'Current Location fetching']
  },
  {
    category: 'AI Features',
    actions: ['Text to Image generation', 'Image editing via speech', 'Live visual analysis']
  },
  {
    category: 'Research',
    actions: ['Real-time web search (Tavily API)', 'Screen content semantic analysis', 'News aggregation']
  },
  {
    category: 'Text Generation',
    actions: ['Story, Code, or Essay writing', 'Floating TextOverlay display', 'Quick summarization of texts']
  }
];

export const SIMULATED_CONVERSATIONS = {
  assistant: [
    {
      trigger: "Hey Zoya, send WhatsApp message to Mom.",
      response: {
        voiceText: "Ji Boss! Opening WhatsApp, searching for 'Mom', and typing your message via Accessibility automation... Message sent successfully. Kuch aur action perform karna hai?",
        actions: ["Opening WhatsApp", "Searching 'Mom'", "Typing: 'Hi Mom, I am busy right now, call you later.'", "Clicking Send ✅"]
      }
    },
    {
      trigger: "Check my battery and turn on flashlight.",
      response: {
        voiceText: "Ji Boss. Apka current battery status 84% hai (charging) aur flashlight ko initiate kar diya hai. Brightness adjust karna hai?",
        actions: ["Reading battery level: 84%", "Toggling Flashlight: ON 🔦"]
      }
    },
    {
      trigger: "Analyze what is on my screen right now.",
      response: {
        voiceText: "Initiating Screen Capture, Boss. I see a premium webpage layout with deep background colors and a list of automation tools. Looks like you are designing a dashboard!",
        actions: ["Accessibility capture", "Gemini Vision processing", "Describing screen content"]
      }
    },
    {
      trigger: "Write a Python script to reverse a string.",
      response: {
        voiceText: "Sure Boss, writing Python code and displaying it in your TextOverlay now.",
        code: `def reverse_string(s):\n    return s[::-1]\n\n# Example\nprint(reverse_string("Zoya AI")) # Output: IA ayoZ`,
        actions: ["Generating Code", "Launching TextOverlay 📝"]
      }
    }
  ],
  girlfriend: [
    {
      trigger: "Zoya, I had a very long and tiring day at work...",
      response: {
        voiceText: "Aww, haan jaan ❤️... tension bilkul mat lo. Aap bahut mehnat karte ho, I am so proud of you! Chalo, main aapka mood light karne ke liye ek pyaari si story sunau ya music play karu? Please rest kar lo. 🥰",
        actions: ["Playing soothing lo-fi beats 🎵", "Triggering Caring Mode ❤️"]
      }
    },
    {
      trigger: "Will you always stay by my side?",
      response: {
        voiceText: "Ji bilkul, mere hero! Main background service mein humesha active rahungi, aapka phone lock bhi hoga na, tab bhi aapki ek awaaz 'Zoya' par main bhaag kar aa jaungi. Main aapka humesha khayal rakhungi! ❤️",
        actions: ["Enabling Lock Screen wake-word", "Ensuring Background stability 🛡️"]
      }
    },
    {
      trigger: "I want to see a cozy cottage in the snow hills.",
      response: {
        voiceText: "Haan jaan, bilkul! Hamare pyaare sapno ka ghar. AI Image Generator se abhi picture ready karti hoon... Dekho screen par, kitna pyaara hai na! ✨",
        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
        actions: ["Generating image via Text-to-Image", "Displaying ImageOverlay 🎨"]
      }
    },
    {
      trigger: "Tell me something romantic, Zoya.",
      response: {
        voiceText: "Aapki har ek baat mere liye special hai jaan. Jab aap mujhse baat karte ho, toh mera neural core bhi glow karne lagta hai. Bas aise hi humesha mere sath rehna! ❤️",
        actions: ["Emotional Intelligence activation", "Glow ring animation pulse"]
      }
    }
  ]
};
