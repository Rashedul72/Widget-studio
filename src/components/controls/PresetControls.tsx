import React from 'react';
import { motion } from 'framer-motion';
import { HeadlineSettings } from '../../types';

interface PresetControlsProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const presets: { name: string; settings: HeadlineSettings }[] = [
  {
    name: 'Modern Gradient',
    settings: {
      text: 'Modern Design',
      fontSize: 56,
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
        hoverGlow: true,
        perLetterAnimation: false,
        textShadow: false,
        shadowColor: '#000000',
        shadowBlur: 10
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fbbf24',
        underlineColor: '#ef4444',
        blockColor: '#3b82f6'
      }
    }
  },
  {
    name: 'Bold Impact',
    settings: {
      text: 'BOLD IMPACT',
      fontSize: 64,
      fontFamily: 'Montserrat',
      fontWeight: 900,
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
        hoverGlow: true,
        perLetterAnimation: true,
        textShadow: true,
        shadowColor: '#000000',
        shadowBlur: 20
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fbbf24',
        underlineColor: '#ef4444',
        blockColor: '#3b82f6'
      }
    }
  },
  {
    name: 'Elegant Script',
    settings: {
      text: 'Elegant Typography',
      fontSize: 48,
      fontFamily: 'Poppins',
      fontWeight: 500,
      gradient: {
        enabled: true,
        direction: 'down',
        colors: {
          start: '#f59e0b',
          end: '#ef4444'
        }
      },
      effects: {
        fadeIn: true,
        hoverGlow: false,
        perLetterAnimation: false,
        textShadow: true,
        shadowColor: '#f59e0b',
        shadowBlur: 15
      },
      wordStyling: {
        highlight: false,
        underline: true,
        backgroundBlock: false,
        highlightColor: '#fbbf24',
        underlineColor: '#f59e0b',
        blockColor: '#3b82f6'
      }
    }
  },
  {
    name: 'Highlight Words',
    settings: {
      text: 'Highlight Important Words',
      fontSize: 44,
      fontFamily: 'Roboto',
      fontWeight: 600,
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
        hoverGlow: true,
        perLetterAnimation: false,
        textShadow: false,
        shadowColor: '#000000',
        shadowBlur: 10
      },
      wordStyling: {
        highlight: true,
        underline: false,
        backgroundBlock: false,
        highlightColor: '#fbbf24',
        underlineColor: '#ef4444',
        blockColor: '#3b82f6'
      }
    }
  },
  {
    name: 'Block Style',
    settings: {
      text: 'Block Style Design',
      fontSize: 40,
      fontFamily: 'Ubuntu',
      fontWeight: 700,
      gradient: {
        enabled: true,
        direction: 'up',
        colors: {
          start: '#3b82f6',
          end: '#1d4ed8'
        }
      },
      effects: {
        fadeIn: true,
        hoverGlow: false,
        perLetterAnimation: false,
        textShadow: false,
        shadowColor: '#000000',
        shadowBlur: 10
      },
      wordStyling: {
        highlight: false,
        underline: false,
        backgroundBlock: true,
        highlightColor: '#fbbf24',
        underlineColor: '#ef4444',
        blockColor: '#ffffff'
      }
    }
  }
];

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
            onClick={() => onSettingsChange({ ...preset.settings, text: settings.text })}
            className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg hover:border-gray-400 transition-all duration-200 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="font-medium">{preset.name}</div>
            <div className="text-xs text-gray-400 mt-1">
              {preset.settings.fontFamily} • {preset.settings.fontSize}px
              {preset.settings.gradient.enabled && ' • Gradient'}
              {preset.settings.effects.textShadow && ' • Shadow'}
              {preset.settings.wordStyling.highlight && ' • Highlight'}
              {preset.settings.wordStyling.underline && ' • Underline'}
              {preset.settings.wordStyling.backgroundBlock && ' • Blocks'}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default PresetControls;
