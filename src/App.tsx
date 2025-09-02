import React, { useState } from 'react';
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
  gradient: {
    enabled: true,
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
    blockColor: '#3b82f6'
  }
};

function App() {
  const [settings, setSettings] = useState<HeadlineSettings>(defaultSettings);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      {/* Three-column layout: left controls (scroll), right sticky preview */}
      <div className="h-[calc(100vh-64px)] overflow-hidden grid grid-cols-3 gap-0">
        {/* Left: Controls (scrollable only column) */}
        <div className="col-span-1 h-full overflow-y-auto">
          <ControlPanel 
            settings={settings} 
            onSettingsChange={setSettings} 
          />
        </div>

        {/* Right: Sticky Preview spanning two columns */}
        <div className="col-span-2 h-full p-6 flex items-center justify-center">
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
      </div>
    </div>
  );
}

export default App;
