import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { HeadlineSettings } from '../../types';

interface ExportControlsProps {
  settings: HeadlineSettings;
}

const ExportControls: React.FC<ExportControlsProps> = ({ settings }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const generateEmbedCode = () => {
    const gradientStyle = settings.gradient.enabled 
      ? `background: linear-gradient(${
          settings.gradient.direction === 'right' ? 'to right' :
          settings.gradient.direction === 'left' ? 'to left' :
          settings.gradient.direction === 'down' ? 'to bottom' : 'to top'
        }, ${settings.gradient.colors.start}, ${settings.gradient.colors.end});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;`
      : '';

    const textShadowStyle = settings.effects.textShadow 
      ? `text-shadow: 0 0 ${settings.effects.shadowBlur}px ${settings.effects.shadowColor};`
      : '';

    const wordStylingStyle = settings.wordStyling.highlight 
      ? `background-color: ${settings.wordStyling.highlightColor}; padding: 2px 4px; border-radius: 4px;`
      : settings.wordStyling.underline
      ? `text-decoration: underline; text-decoration-color: ${settings.wordStyling.underlineColor}; text-decoration-thickness: 2px;`
      : settings.wordStyling.backgroundBlock
      ? `background-color: ${settings.wordStyling.blockColor}; padding: 4px 8px; border-radius: 6px; display: inline-block; margin: 0 2px;`
      : '';

    return `<!-- Headline Widget -->
<div class="headline-widget" style="
  font-size: ${settings.fontSize}px;
  font-family: '${settings.fontFamily}', sans-serif;
  font-weight: ${settings.fontWeight};
  text-align: center;
  line-height: 1.2;
  ${gradientStyle}
  ${textShadowStyle}
">
  <span style="${wordStylingStyle}">${settings.text}</span>
</div>

<style>
  .headline-widget {
    cursor: pointer;
    user-select: none;
    padding: 20px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .headline-widget:hover {
    transform: scale(1.05);
    ${settings.effects.hoverGlow ? 'filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.5));' : ''}
  }
</style>`;
  };

  const generateJSON = () => {
    return JSON.stringify(settings, null, 2);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Export</h3>
      
      <div className="space-y-4">
        {/* JSON Export */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              JSON Configuration
            </label>
            <button
              onClick={() => copyToClipboard(generateJSON(), 'json')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                copied === 'json' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied === 'json' ? 'Copied!' : 'Copy JSON'}
            </button>
          </div>
          <textarea
            value={generateJSON()}
            readOnly
            className="w-full h-24 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* HTML Export */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">
              HTML Embed Code
            </label>
            <button
              onClick={() => copyToClipboard(generateEmbedCode(), 'html')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                copied === 'html' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {copied === 'html' ? 'Copied!' : 'Copy HTML'}
            </button>
          </div>
          <textarea
            value={generateEmbedCode()}
            readOnly
            className="w-full h-32 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Download Options */}
        <div className="flex space-x-2">
          <button
            onClick={() => {
              const blob = new Blob([generateJSON()], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'headline-settings.json';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200 text-sm font-medium"
          >
            Download JSON
          </button>
          <button
            onClick={() => {
              const blob = new Blob([generateEmbedCode()], { type: 'text/html' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'headline-widget.html';
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200 text-sm font-medium"
          >
            Download HTML
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExportControls;
