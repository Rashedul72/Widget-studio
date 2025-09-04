import React from 'react';
import { motion } from 'framer-motion';
import type { HeadlineSettings } from '../../types';

interface PresetControlsProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const presets: { name: string; settings: HeadlineSettings }[] = [
  {
    name: 'Neon Glow',
    settings: {
      text: 'Neon Glow',
      fontSize: 60,
      fontFamily: 'Poppins',
      fontWeight: 800,
      textColor: '#ffffff',
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
        colors: { start: '#22d3ee', end: '#a78bfa' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'zoom-in',
        hoverGlow: true,
        hoverGlowColor: '#60a5fa',
        perLetterAnimation: true,
        textShadow: true,
        shadowColor: '#60a5fa',
        shadowBlur: 20
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fde047',
        underlineColor: '#22d3ee',
        blockColor: '#111827',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  },
  {
    name: 'Frosted Glass',
    settings: {
      text: 'Frosted Glass',
      fontSize: 52,
      fontFamily: 'Inter',
      fontWeight: 700,
      textColor: '#111827',
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
        colors: { start: '#93c5fd', end: '#e9d5ff' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'slide-up',
        hoverGlow: false,
        hoverGlowColor: '#93c5fd',
        perLetterAnimation: false,
        textShadow: false,
        shadowColor: '#000000',
        shadowBlur: 12
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fef3c7',
        underlineColor: '#a78bfa',
        blockColor: '#ffffff',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  },
  {
    name: 'Sunset Duotone',
    settings: {
      text: 'Sunset Duotone',
      fontSize: 58,
      fontFamily: 'Montserrat',
      fontWeight: 800,
      textColor: '#111827',
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
        direction: 'down',
        colors: { start: '#fb923c', end: '#ef4444' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'fade',
        hoverGlow: true,
        hoverGlowColor: '#fb923c',
        perLetterAnimation: false,
        textShadow: false,
        shadowColor: '#ef4444',
        shadowBlur: 10
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fde047',
        underlineColor: '#fb923c',
        blockColor: '#ffffff',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  },
  {
    name: 'Minimal Mono',
    settings: {
      text: 'Minimal Mono',
      fontSize: 48,
      fontFamily: 'Raleway',
      fontWeight: 600,
      textColor: '#111827',
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
        colors: { start: '#000000', end: '#000000' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'slide-right',
        hoverGlow: false,
        hoverGlowColor: '#9ca3af',
        perLetterAnimation: false,
        textShadow: false,
        shadowColor: '#9ca3af',
        shadowBlur: 0
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#e5e7eb',
        underlineColor: '#9ca3af',
        blockColor: '#f3f4f6',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  },
  {
    name: 'Retro Pop',
    settings: {
      text: 'Retro Pop',
      fontSize: 64,
      fontFamily: 'Ubuntu',
      fontWeight: 900,
      textColor: '#111827',
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
        colors: { start: '#f59e0b', end: '#ef4444' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'bounce-in',
        hoverGlow: true,
        hoverGlowColor: '#f59e0b',
        perLetterAnimation: true,
        textShadow: true,
        shadowColor: '#f59e0b',
        shadowBlur: 18
      },
      wordStyling: {
        highlight: true,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fde047',
        underlineColor: '#ef4444',
        blockColor: '#ffffff',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  },
  {
    name: 'Luxe Gold',
    settings: {
      text: 'Luxe Gold',
      fontSize: 54,
      fontFamily: 'Poppins',
      fontWeight: 700,
      textColor: '#111827',
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
        colors: { start: '#f59e0b', end: '#facc15' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'rotate-in',
        hoverGlow: true,
        hoverGlowColor: '#f59e0b',
        perLetterAnimation: false,
        textShadow: true,
        shadowColor: '#f59e0b',
        shadowBlur: 12
      },
      wordStyling: {
        highlight: false,
        underline: true,
        backgroundBlock: false,
        highlightColor: '#fde68a',
        underlineColor: '#f59e0b',
        blockColor: '#fff7ed',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  },
  {
    name: 'Cyber Punk',
    settings: {
      text: 'Cyber Punk',
      fontSize: 60,
      fontFamily: 'Montserrat',
      fontWeight: 800,
      textColor: '#ecfeff',
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
        colors: { start: '#06b6d4', end: '#a21caf' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'flip-in-y',
        hoverGlow: true,
        hoverGlowColor: '#a78bfa',
        perLetterAnimation: true,
        textShadow: true,
        shadowColor: '#a78bfa',
        shadowBlur: 22
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#f472b6',
        underlineColor: '#22d3ee',
        blockColor: '#111827',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  },
  {
    name: 'Soft Pastel',
    settings: {
      text: 'Soft Pastel',
      fontSize: 50,
      fontFamily: 'Nunito',
      fontWeight: 700,
      textColor: '#334155',
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
        direction: 'up',
        colors: { start: '#fbcfe8', end: '#bae6fd' }
      },
      effects: {
        fadeIn: true,
        fadeInMode: 'slide-left',
        hoverGlow: false,
        hoverGlowColor: '#60a5fa',
        perLetterAnimation: false,
        textShadow: false,
        shadowColor: '#000000',
        shadowBlur: 8
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fde047',
        underlineColor: '#60a5fa',
        blockColor: '#ffffff',
        blockBorderRadius: 6,
        blockBoxShadow: { enabled: false, x: 0, y: 2, blur: 4, color: '#000000' }
      }
    }
  }
];

const shallowEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const isPresetSelected = (current: HeadlineSettings, preset: HeadlineSettings) => {
  // Compare core style properties; ignore text and dynamic word colors
  return (
    current.fontSize === preset.fontSize &&
    current.fontFamily === preset.fontFamily &&
    current.fontWeight === preset.fontWeight &&
    shallowEqual(current.gradient, preset.gradient) &&
    shallowEqual(
      {
        fadeIn: current.effects.fadeIn,
        fadeInMode: current.effects.fadeInMode,
        hoverGlow: current.effects.hoverGlow,
        hoverGlowColor: current.effects.hoverGlowColor,
        perLetterAnimation: current.effects.perLetterAnimation,
        textShadow: current.effects.textShadow,
        shadowColor: current.effects.shadowColor,
        shadowBlur: current.effects.shadowBlur
      },
      {
        fadeIn: preset.effects.fadeIn,
        fadeInMode: preset.effects.fadeInMode,
        hoverGlow: preset.effects.hoverGlow,
        hoverGlowColor: preset.effects.hoverGlowColor,
        perLetterAnimation: preset.effects.perLetterAnimation,
        textShadow: preset.effects.textShadow,
        shadowColor: preset.effects.shadowColor,
        shadowBlur: preset.effects.shadowBlur
      }
    ) &&
    shallowEqual(current.wordStyling, preset.wordStyling) &&
    current.textColor === preset.textColor
  );
};

const PresetControls: React.FC<PresetControlsProps> = ({ settings, onSettingsChange }) => {
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Presets</h3>
      
      <div className="grid grid-cols-1 gap-2">
        {presets.map((preset, index) => (
          <motion.button
            key={preset.name}
            onClick={() => onSettingsChange({
              ...preset.settings,
              text: settings.text,
              wordColors: settings.wordColors,
              wordColorsEnabled: settings.wordColorsEnabled
            })}
            aria-pressed={isPresetSelected(settings, preset.settings)}
            className={`w-full px-4 py-3 rounded-lg transition-all duration-200 text-left flex items-center justify-between ${
              isPresetSelected(settings, preset.settings)
                ? 'bg-blue-50 border border-blue-500 text-blue-900'
                : 'bg-white border border-gray-300 text-gray-800 hover:border-gray-400'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div>
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs mt-1 ${isPresetSelected(settings, preset.settings) ? 'text-blue-700' : 'text-gray-400'}">
                {preset.settings.fontFamily} • {preset.settings.fontSize}px
                {preset.settings.gradient.enabled && ' • Gradient'}
                {preset.settings.effects.textShadow && ' • Shadow'}
                {preset.settings.wordStyling.highlight && ' • Highlight'}
                {preset.settings.wordStyling.underline && ' • Underline'}
                {preset.settings.wordStyling.backgroundBlock && ' • Blocks'}
              </div>
            </div>
            {isPresetSelected(settings, preset.settings) && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs">✓</span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default PresetControls;
