import React, { useEffect, useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { motion } from 'framer-motion';
import type { HeadlineSettings } from '../../types';

interface TypographyControlsProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const fontFamilies = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Nunito',
  'Source Sans Pro',
  'Raleway',
  'Ubuntu'
];

const fontWeights = [
  { value: 300, label: 'Light' },
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semi Bold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
  { value: 900, label: 'Black' }
];

const TypographyControls: React.FC<TypographyControlsProps> = ({ settings, onSettingsChange }) => {
  const [fontSizeInput, setFontSizeInput] = useState<string>(String(settings.fontSize));

  useEffect(() => {
    setFontSizeInput(String(settings.fontSize));
  }, [settings.fontSize]);

  const handleFontSizeChange = (fontSize: number) => {
    onSettingsChange({ ...settings, fontSize });
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    onSettingsChange({ ...settings, fontFamily });
  };

  const handleFontWeightChange = (fontWeight: number) => {
    onSettingsChange({ ...settings, fontWeight });
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-semibold mb-6 text-gray-900">Typography</h3>

      {/* Headline Text */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Headline Text
        </label>
        <input
          type="text"
          value={settings.text}
          onChange={(e) => onSettingsChange({ ...settings, text: e.target.value })}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your headline..."
        />
      </div>

      {/* Font Size */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Font Size
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              value={fontSizeInput}
              onChange={(e) => setFontSizeInput(e.target.value)}
              onBlur={() => {
                const n = Number(fontSizeInput);
                const clamped = isNaN(n) ? 16 : Math.min(120, Math.max(16, Math.round(n)));
                handleFontSizeChange(clamped);
                setFontSizeInput(String(clamped));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  (e.currentTarget as HTMLInputElement).blur();
                }
              }}
              className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="16-120"
            />
            <span className="text-xs text-gray-500">px</span>
          </div>
        </div>

        {/* Radix Slider */}
        <Slider.Root
          className="relative flex items-center select-none touch-none h-6"
          min={16}
          max={120}
          step={1}
          value={[settings.fontSize]}
          onValueChange={([v]) => handleFontSizeChange(v)}
          aria-label="Font size"
        >
          <Slider.Track className="relative h-2 grow rounded-full bg-slate-200">
            <Slider.Range className="absolute h-2 rounded-full bg-blue-400" />
          </Slider.Track>
          <Slider.Thumb className="block h-6 w-6 rounded-full bg-white border border-slate-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </Slider.Root>
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>16</span>
          <span>120</span>
        </div>
      </div>

      {/* Font Family */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          value={settings.fontFamily}
          onChange={(e) => handleFontFamilyChange(e.target.value)}
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          style={{ fontFamily: settings.fontFamily }}
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Font Weight */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Weight
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fontWeights.map((weight) => (
            <button
              key={weight.value}
              onClick={() => handleFontWeightChange(weight.value)}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                settings.fontWeight === weight.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
              }`}
              style={{ fontWeight: weight.value }}
            >
              {weight.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TypographyControls;
