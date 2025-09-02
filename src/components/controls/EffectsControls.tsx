import React from 'react';
import { motion } from 'framer-motion';
import type { HeadlineSettings } from '../../types';

interface EffectsControlsProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const EffectsControls: React.FC<EffectsControlsProps> = ({ settings, onSettingsChange }) => {
  const handleEffectToggle = (effect: keyof typeof settings.effects, enabled: boolean) => {
    onSettingsChange({
      ...settings,
      effects: { ...settings.effects, [effect]: enabled }
    });
  };

  const handleShadowColorChange = (color: string) => {
    onSettingsChange({
      ...settings,
      effects: { ...settings.effects, shadowColor: color }
    });
  };

  const handleShadowBlurChange = (blur: number) => {
    onSettingsChange({
      ...settings,
      effects: { ...settings.effects, shadowBlur: blur }
    });
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Effects</h3>
      
      {/* Fade In Mode */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Entrance Animation</label>
        <select
          value={settings.effects.fadeInMode ?? (settings.effects.fadeIn ? 'fade' : 'none')}
          onChange={(e) => onSettingsChange({
            ...settings,
            effects: { ...settings.effects, fadeInMode: e.target.value as any, fadeIn: e.target.value !== 'none' }
          })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="none">None</option>
          <option value="fade">Fade In</option>
          <option value="slide-up">Slide Up</option>
          <option value="slide-down">Slide Down</option>
          <option value="slide-left">Slide Left</option>
          <option value="slide-right">Slide Right</option>
          <option value="zoom-in">Zoom In</option>
          <option value="bounce-in">Bounce In</option>
          <option value="flip-in-x">Flip In (X)</option>
          <option value="flip-in-y">Flip In (Y)</option>
          <option value="rotate-in">Rotate In</option>
          <option value="typewriter">Typewriter</option>
        </select>
      </div>

      {/* Effect Toggles */}
      <div className="space-y-4">
        {[
          { key: 'hoverGlow', label: 'Hover Glow', description: 'Glowing effect on hover' },
          { key: 'perLetterAnimation', label: 'Per Letter Animation', description: 'Animate each word individually' },
          { key: 'textShadow', label: 'Text Shadow', description: 'Add shadow to text' }
        ].map((effect) => (
          <div key={effect.key} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">{effect.label}</div>
              <div className="text-xs text-gray-400">{effect.description}</div>
            </div>
            <button
              onClick={() => handleEffectToggle(effect.key as keyof typeof settings.effects, !settings.effects[effect.key as keyof typeof settings.effects])}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.effects[effect.key as keyof typeof settings.effects] ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.effects[effect.key as keyof typeof settings.effects] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Text Shadow Controls */}
      {settings.effects.textShadow && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-300"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shadow Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.effects.shadowColor}
                  onChange={(e) => handleShadowColorChange(e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.effects.shadowColor}
                  onChange={(e) => handleShadowColorChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shadow Blur: {settings.effects.shadowBlur}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={settings.effects.shadowBlur}
                onChange={(e) => handleShadowBlurChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${(settings.effects.shadowBlur / 50) * 100}%, #374151 ${(settings.effects.shadowBlur / 50) * 100}%, #374151 100%)`
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EffectsControls;
