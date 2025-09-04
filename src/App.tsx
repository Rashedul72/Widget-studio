import { useState } from 'react';
import { motion } from 'framer-motion';
import HeadlineWidget from './components/HeadlineWidget';
import Navbar from './components/Navbar';
import ControlPanel from './components/ControlPanel';
import type { HeadlineSettings } from './types';
import './App.css';

const defaultSettings: HeadlineSettings = {
  text: 'Create Amazing Headlines',
  fontSize: 64,
  fontFamily: 'Inter',
  fontWeight: 700,
  textColor: '#1f2937',
  wordColors: {},
  wordColorsEnabled: false,
  letterSpacing: 0,
  lineHeight: 1.2,
  textTransform: 'none',
  textOutline: {
    enabled: false,
    width: 2,
    color: '#000000'
  },
  gradient: {
    enabled: false,
    direction: 'right',
    colors: {
      start: '#6366f1',
      end: '#8b5cf6'
    }
  },
  effects: {
    fadeIn: true,
    fadeInMode: 'fade',
    hoverGlow: true,
    hoverGlowColor: '#60a5fa',
    perLetterAnimation: false,
    textShadow: true,
    shadowColor: '#6366f1',
    shadowBlur: 15
  },
  wordStyling: {
    highlight: false,
    underline: false,
    backgroundBlock: false,
    highlightColor: '#fbbf24',
    underlineColor: '#ef4444',
    blockColor: '#3b82f6',
    blockBorderRadius: 6,
    blockBoxShadow: {
      enabled: false,
      x: 0,
      y: 2,
      blur: 4,
      color: '#000000'
    }
  }
};

function App() {
  const [settings, setSettings] = useState<HeadlineSettings>(defaultSettings);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      {/* Desktop: 3 cols; Mobile: stack with preview first */}
      <div className="md:h-[calc(100vh-64px)] md:overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Preview (mobile first), sticky area on desktop */}
        <div className="order-1 md:order-2 md:col-span-2 h-auto md:h-full p-4 md:p-6 flex items-center justify-center max-h-[70vh] overflow-auto md:max-h-none md:overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <HeadlineWidget 
              settings={settings} 
              onSettingsChange={setSettings} 
            />
          </motion.div>
        </div>

        {/* Controls (scrollable column) */}
        <div className="order-2 md:order-1 col-span-1 h-auto md:h-full md:overflow-y-auto">
          <ControlPanel 
            settings={settings} 
            onSettingsChange={setSettings} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
