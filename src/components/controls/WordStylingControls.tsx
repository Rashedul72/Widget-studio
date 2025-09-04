import React from 'react';
import { motion } from 'framer-motion';
import type { HeadlineSettings } from '../../types';

interface WordStylingControlsProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const WordStylingControls: React.FC<WordStylingControlsProps> = ({ settings, onSettingsChange }) => {
  const handleStylingToggle = (styling: keyof typeof settings.wordStyling, enabled: boolean) => {
    onSettingsChange({
      ...settings,
      wordStyling: { ...settings.wordStyling, [styling]: enabled }
    });
  };

  const handleColorChange = (colorType: keyof typeof settings.wordStyling, color: string) => {
    onSettingsChange({
      ...settings,
      wordStyling: { ...settings.wordStyling, [colorType]: color }
    });
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Word Styling</h3>
      
      {/* Styling Options */}
      <div className="space-y-4">
        {[
          { key: 'highlight', label: 'Highlight', description: 'Background highlight for words' },
          { key: 'underline', label: 'Underline', description: 'Underline each word' },
          { key: 'backgroundBlock', label: 'Background Block', description: 'Block background for words' }
        ].map((styling) => (
          <div key={styling.key} className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-700">{styling.label}</div>
              <div className="text-xs text-gray-400">{styling.description}</div>
            </div>
            <button
              onClick={() => handleStylingToggle(styling.key as keyof typeof settings.wordStyling, !settings.wordStyling[styling.key as keyof typeof settings.wordStyling])}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                settings.wordStyling[styling.key as keyof typeof settings.wordStyling] ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  settings.wordStyling[styling.key as keyof typeof settings.wordStyling] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Color Controls */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: 1, 
          height: 'auto' 
        }}
        transition={{ duration: 0.3 }}
        className="mt-4 pt-4 border-t border-gray-300"
      >
        <div className="space-y-4">
          {settings.wordStyling.highlight && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Highlight Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.wordStyling.highlightColor}
                  onChange={(e) => handleColorChange('highlightColor', e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.wordStyling.highlightColor}
                  onChange={(e) => handleColorChange('highlightColor', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#ffff00"
                />
              </div>
            </div>
          )}

          {settings.wordStyling.underline && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Underline Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.wordStyling.underlineColor}
                  onChange={(e) => handleColorChange('underlineColor', e.target.value)}
                  className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.wordStyling.underlineColor}
                  onChange={(e) => handleColorChange('underlineColor', e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#ff0000"
                />
              </div>
            </div>
          )}

          {settings.wordStyling.backgroundBlock && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Block Color
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={settings.wordStyling.blockColor}
                    onChange={(e) => handleColorChange('blockColor', e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.wordStyling.blockColor}
                    onChange={(e) => handleColorChange('blockColor', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#0000ff"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Border Radius: {settings.wordStyling.blockBorderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={settings.wordStyling.blockBorderRadius}
                  onChange={(e) => onSettingsChange({
                    ...settings,
                    wordStyling: { ...settings.wordStyling, blockBorderRadius: Number(e.target.value) }
                  })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Box Shadow</label>
                  <button
                    type="button"
                    onClick={() => onSettingsChange({
                      ...settings,
                      wordStyling: {
                        ...settings.wordStyling,
                        blockBoxShadow: { ...settings.wordStyling.blockBoxShadow, enabled: !settings.wordStyling.blockBoxShadow.enabled }
                      }
                    })}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${
                      settings.wordStyling.blockBoxShadow.enabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
                        settings.wordStyling.blockBoxShadow.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {settings.wordStyling.blockBoxShadow.enabled && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">X: {settings.wordStyling.blockBoxShadow.x}px</label>
                        <input
                          type="range"
                          min="-10"
                          max="10"
                          step="1"
                          value={settings.wordStyling.blockBoxShadow.x}
                          onChange={(e) => onSettingsChange({
                            ...settings,
                            wordStyling: {
                              ...settings.wordStyling,
                              blockBoxShadow: { ...settings.wordStyling.blockBoxShadow, x: Number(e.target.value) }
                            }
                          })}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Y: {settings.wordStyling.blockBoxShadow.y}px</label>
                        <input
                          type="range"
                          min="-10"
                          max="10"
                          step="1"
                          value={settings.wordStyling.blockBoxShadow.y}
                          onChange={(e) => onSettingsChange({
                            ...settings,
                            wordStyling: {
                              ...settings.wordStyling,
                              blockBoxShadow: { ...settings.wordStyling.blockBoxShadow, y: Number(e.target.value) }
                            }
                          })}
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Blur: {settings.wordStyling.blockBoxShadow.blur}px</label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={settings.wordStyling.blockBoxShadow.blur}
                        onChange={(e) => onSettingsChange({
                          ...settings,
                          wordStyling: {
                            ...settings.wordStyling,
                            blockBoxShadow: { ...settings.wordStyling.blockBoxShadow, blur: Number(e.target.value) }
                          }
                        })}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Shadow Color</label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="color"
                          value={settings.wordStyling.blockBoxShadow.color}
                          onChange={(e) => onSettingsChange({
                            ...settings,
                            wordStyling: {
                              ...settings.wordStyling,
                              blockBoxShadow: { ...settings.wordStyling.blockBoxShadow, color: e.target.value }
                            }
                          })}
                          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={settings.wordStyling.blockBoxShadow.color}
                          onChange={(e) => onSettingsChange({
                            ...settings,
                            wordStyling: {
                              ...settings.wordStyling,
                              blockBoxShadow: { ...settings.wordStyling.blockBoxShadow, color: e.target.value }
                            }
                          })}
                          className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-gray-800 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WordStylingControls;
