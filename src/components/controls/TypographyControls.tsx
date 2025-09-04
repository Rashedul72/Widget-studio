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

  const handleTextColorChange = (textColor: string) => {
    onSettingsChange({ ...settings, textColor });
  };

  const handleLetterSpacingChange = (letterSpacing: number) => {
    onSettingsChange({ ...settings, letterSpacing });
  };

  const handleLineHeightChange = (lineHeight: number) => {
    onSettingsChange({ ...settings, lineHeight });
  };

  const handleTextTransformChange = (textTransform: HeadlineSettings['textTransform']) => {
    onSettingsChange({ ...settings, textTransform });
  };

  const handleTextOutlineToggle = (enabled: boolean) => {
    onSettingsChange({
      ...settings,
      textOutline: { ...settings.textOutline, enabled }
    });
  };

  const handleTextOutlineWidthChange = (width: number) => {
    onSettingsChange({
      ...settings,
      textOutline: { ...settings.textOutline, width }
    });
  };

  const handleTextOutlineColorChange = (color: string) => {
    onSettingsChange({
      ...settings,
      textOutline: { ...settings.textOutline, color }
    });
  };

  const assignWordColor = (wordIndex: number, color: string) => {
    const next = { ...settings.wordColors, [wordIndex]: color };
    onSettingsChange({ ...settings, wordColors: next });
  };

  const toggleWordColors = () => {
    onSettingsChange({ ...settings, wordColorsEnabled: !settings.wordColorsEnabled });
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
        <textarea
          value={settings.text}
          onChange={(e) => onSettingsChange({ ...settings, text: e.target.value })}
          className="w-full min-h-[96px] px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          placeholder="Type your headline... (use Enter for new lines)"
          rows={4}
        />
      </div>

      {/* Per-word Colors */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">Per-word Colors</label>
          <button
            type="button"
            onClick={toggleWordColors}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${settings.wordColorsEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-pressed={settings.wordColorsEnabled}
            aria-label="Toggle per-word colors"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${settings.wordColorsEnabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
        {settings.wordColorsEnabled && (
        <div className="space-y-2">
          {settings.text.split('\n').map((line, lineIndex) => (
            <div key={`line-${lineIndex}`} className="flex flex-wrap gap-2">
              {line
                .split(' ')
                .filter(Boolean)
                .map((word, wordIndexGlobal) => {
                  const wordIndex = settings.text
                    .split('\n')
                    .slice(0, lineIndex)
                    .join(' ')
                    .split(' ')
                    .filter(Boolean).length + wordIndexGlobal;
                  const color = settings.wordColors[wordIndex] ?? '';
                  return (
                    <div key={`w-${lineIndex}-${wordIndexGlobal}`} className="flex items-center gap-1 border border-gray-200 rounded-lg px-2 py-1 bg-white">
                      <span className="text-sm text-gray-700">{word}</span>
                      <input
                        type="color"
                        value={color || '#000000'}
                        onChange={(e) => assignWordColor(wordIndex, e.target.value)}
                        className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                        title={`Color for "${word}"`}
                      />
                      {color && (
                        <button
                          type="button"
                          onClick={() => assignWordColor(wordIndex, '')}
                          className="text-xs text-gray-500 hover:text-gray-700"
                          aria-label="Clear color"
                        >
                          reset
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
        )}
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
          onValueChange={([v]) => {
            handleFontSizeChange(v);
            setFontSizeInput(String(v));
          }}
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
      <div className="mb-8">
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

      {/* Text Color */}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div className="flex items-center space-x-3">
          <input
            type="color"
            value={settings.textColor}
            onChange={(e) => handleTextColorChange(e.target.value)}
            className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={settings.textColor}
            onChange={(e) => handleTextColorChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="#000000"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Note: Text color is overridden when gradient is enabled
        </p>
      </div>

      {/* Letter Spacing */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Letter Spacing: {settings.letterSpacing}px
          </label>
        </div>
        <input
          type="range"
          min="-2"
          max="10"
          step="0.5"
          value={settings.letterSpacing}
          onChange={(e) => handleLetterSpacingChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>-2px</span>
          <span>10px</span>
        </div>
      </div>

      {/* Line Height */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">
            Line Height: {settings.lineHeight}
          </label>
        </div>
        <input
          type="range"
          min="0.8"
          max="2.5"
          step="0.1"
          value={settings.lineHeight}
          onChange={(e) => handleLineHeightChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-gray-400 mt-1">
          <span>0.8</span>
          <span>2.5</span>
        </div>
      </div>

      {/* Text Transform */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Transform
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'none', label: 'None' },
            { value: 'uppercase', label: 'UPPERCASE' },
            { value: 'lowercase', label: 'lowercase' },
            { value: 'capitalize', label: 'Capitalize' }
          ].map((transform) => (
            <button
              key={transform.value}
              onClick={() => handleTextTransformChange(transform.value as HeadlineSettings['textTransform'])}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                settings.textTransform === transform.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
              }`}
            >
              {transform.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Outline */}
      <div className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Text Outline</label>
          <button
            type="button"
            onClick={() => handleTextOutlineToggle(!settings.textOutline.enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              settings.textOutline.enabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                settings.textOutline.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {settings.textOutline.enabled && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outline Width: {settings.textOutline.width}px
              </label>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={settings.textOutline.width}
                onChange={(e) => handleTextOutlineWidthChange(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Outline Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.textOutline.color}
                  onChange={(e) => handleTextOutlineColorChange(e.target.value)}
                  className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.textOutline.color}
                  onChange={(e) => handleTextOutlineColorChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TypographyControls;
