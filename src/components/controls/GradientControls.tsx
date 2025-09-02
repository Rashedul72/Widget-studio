import React from 'react';
import { motion } from 'framer-motion';
import type { HeadlineSettings } from '../../types';

interface GradientControlsProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const gradientDirections = [
  { value: 'right', label: '→', description: 'Left to Right' },
  { value: 'left', label: '←', description: 'Right to Left' },
  { value: 'down', label: '↓', description: 'Top to Bottom' },
  { value: 'up', label: '↑', description: 'Bottom to Top' }
];

const GradientControls: React.FC<GradientControlsProps> = ({ settings, onSettingsChange }) => {
  const handleGradientToggle = (enabled: boolean) => {
    onSettingsChange({
      ...settings,
      gradient: { ...settings.gradient, enabled }
    });
  };

  const handleDirectionChange = (direction: 'right' | 'left' | 'down' | 'up') => {
    onSettingsChange({
      ...settings,
      gradient: { ...settings.gradient, direction }
    });
  };

  const handleColorChange = (colorType: 'start' | 'end', color: string) => {
    onSettingsChange({
      ...settings,
      gradient: {
        ...settings.gradient,
        colors: { ...settings.gradient.colors, [colorType]: color }
      }
    });
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Gradient</h3>
      
      {/* Gradient Toggle */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Enable Gradient
          </label>
          <button
            onClick={() => handleGradientToggle(!settings.gradient.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              settings.gradient.enabled ? 'bg-blue-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                settings.gradient.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {settings.gradient.enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Direction Controls */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Direction
            </label>
            <div className="grid grid-cols-4 gap-3">
              {gradientDirections.map((direction) => (
                <button
                  key={direction.value}
                  onClick={() => handleDirectionChange(direction.value as any)}
                  className={`p-3 rounded-xl text-center transition-all duration-200 border shadow-sm hover:shadow-md focus:outline-none focus:ring-2 ${
                    settings.gradient.direction === direction.value
                      ? 'bg-blue-50 border-blue-400 text-blue-700 ring-blue-300'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                  title={direction.description}
                >
                  <div className="text-xl mb-1">{direction.label}</div>
                  <div className="text-xs text-gray-500">{direction.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.gradient.colors.start}
                  onChange={(e) => handleColorChange('start', e.target.value)}
                  className="w-10 h-10 rounded-none border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.gradient.colors.start}
                  onChange={(e) => handleColorChange('start', e.target.value)}
                  className="w-28 h-10 px-2 py-1 bg-white border border-gray-300 rounded-lg text-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.gradient.colors.end}
                  onChange={(e) => handleColorChange('end', e.target.value)}
                  className="w-10 h-10 rounded-none border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.gradient.colors.end}
                  onChange={(e) => handleColorChange('end', e.target.value)}
                  className="w-28 h-10 px-2 py-1 bg-white border border-gray-300 rounded-lg text-gray-800 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>

          {/* Gradient Preview */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preview
            </label>
            <div
              className="h-8 rounded-lg border border-gray-300"
              style={{
                background: `linear-gradient(${
                  settings.gradient.direction === 'right' ? 'to right' :
                  settings.gradient.direction === 'left' ? 'to left' :
                  settings.gradient.direction === 'down' ? 'to bottom' : 'to top'
                }, ${settings.gradient.colors.start}, ${settings.gradient.colors.end})`
              }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GradientControls;
