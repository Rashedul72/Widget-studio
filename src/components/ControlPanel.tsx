import React from 'react';
import { motion } from 'framer-motion';
import type { HeadlineSettings } from '../types';
import TypographyControls from './controls/TypographyControls';
import GradientControls from './controls/GradientControls';
import EffectsControls from './controls/EffectsControls';
import WordStylingControls from './controls/WordStylingControls';
import PresetControls from './controls/PresetControls';
import ExportControls from './controls/ExportControls';

interface ControlPanelProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, onSettingsChange }) => {
  return (
    <motion.div
      className="control-panel w-full h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200 shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="p-12">

        {/* Controls Stack (single column) */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <LivePreview settings={settings} />
          </motion.div> */}

            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <TypographyControls settings={settings} onSettingsChange={onSettingsChange} />
          </motion.div>
          
          
          
          
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <GradientControls settings={settings} onSettingsChange={onSettingsChange} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <PresetControls settings={settings} onSettingsChange={onSettingsChange} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <EffectsControls settings={settings} onSettingsChange={onSettingsChange} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <WordStylingControls settings={settings} onSettingsChange={onSettingsChange} />
          </motion.div>
        </div>

        {/* Export Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="mb-12"
        >
          <ExportControls settings={settings} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => {
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
                  blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
                }
              };
              onSettingsChange(defaultSettings);
            }}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset to Default
          </button>
          
          <button
            onClick={() => {
              const dataStr = JSON.stringify(settings, null, 2);
              const dataBlob = new Blob([dataStr], {type: 'application/json'});
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'headline-settings.json';
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Save Settings
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;
