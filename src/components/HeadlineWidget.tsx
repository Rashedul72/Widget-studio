import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeadlineSettings } from '../types';

interface HeadlineWidgetProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const HeadlineWidget: React.FC<HeadlineWidgetProps> = ({ settings }) => {
  // Rendering-only widget: editing is disabled; text is controlled via Control Panel

  // Editing handlers removed – text is updated from the Typography Controls

  const getGradientDirection = () => {
    const directions = {
      right: 'to right',
      left: 'to left',
      down: 'to bottom',
      up: 'to top'
    };
    return directions[settings.gradient.direction];
  };

  const getGradientStyle = () => {
    if (!settings.gradient.enabled) return {};
    return {
      background: `linear-gradient(${getGradientDirection()}, ${settings.gradient.colors.start}, ${settings.gradient.colors.end})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      color: 'transparent' as any
    } as React.CSSProperties;
  };

  const getTextShadow = () => {
    if (!settings.effects.textShadow) return 'none';
    return `0 0 ${settings.effects.shadowBlur}px ${settings.effects.shadowColor}`;
  };

  const getHoverFilter = () => {
    const blur = Math.max(10, settings.effects.shadowBlur + 8);
    return `drop-shadow(0 0 ${blur}px ${settings.effects.hoverGlowColor})`;
  };

  const getWordStyle = (_word: string, index: number) => {
    const baseStyle: React.CSSProperties = {
      fontSize: `${settings.fontSize}px`,
      fontFamily: settings.fontFamily,
      fontWeight: settings.fontWeight,
      textShadow: getTextShadow(),
      letterSpacing: `${settings.letterSpacing}px`,
      textTransform: settings.textTransform,
      // With gradient enabled, color is provided by the line container; leave undefined
      color: settings.gradient.enabled
        ? undefined
        : (settings.wordColorsEnabled && settings.wordColors[index]) || settings.textColor
    };

    // Add text outline if enabled
    if (settings.textOutline.enabled) {
      baseStyle.WebkitTextStroke = `${settings.textOutline.width}px ${settings.textOutline.color}`;
    }

    const finalBase = baseStyle;

    if (settings.wordStyling.highlight) {
      return {
        ...finalBase,
        backgroundColor: settings.wordStyling.highlightColor,
        padding: '2px 4px',
        borderRadius: '4px'
      };
    }

    if (settings.wordStyling.underline) {
      return {
        ...finalBase,
        textDecoration: 'underline',
        textDecorationColor: settings.wordStyling.underlineColor,
        textDecorationThickness: '2px'
      };
    }

    if (settings.wordStyling.backgroundBlock) {
      const blockStyle: React.CSSProperties = {
        ...baseStyle,
        backgroundColor: settings.wordStyling.blockColor,
        padding: '4px 8px',
        borderRadius: `${settings.wordStyling.blockBorderRadius}px`,
        display: 'inline-block',
        margin: '0 2px'
      };

      // Add box shadow if enabled
      if (settings.wordStyling.blockBoxShadow.enabled) {
        blockStyle.boxShadow = `${settings.wordStyling.blockBoxShadow.x}px ${settings.wordStyling.blockBoxShadow.y}px ${settings.wordStyling.blockBoxShadow.blur}px ${settings.wordStyling.blockBoxShadow.color}`;
      }

      return blockStyle;
    }

    return finalBase;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const initialState = (settings.effects.fadeInMode && settings.effects.fadeInMode !== 'none') || settings.effects.fadeIn ? 'hidden' : 'visible';

  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      key={`widget-${settings.fontSize}-${settings.fontFamily}-${settings.fontWeight}-${settings.textColor}-${settings.text}-${settings.gradient.enabled}-${settings.gradient.direction}-${settings.gradient.colors.start}-${settings.gradient.colors.end}`}
      className="mx-auto my-6 w-full cursor-default select-none text-center p-12 rounded-3xl bg-white ring-1 ring-gray-200 min-h-[220px] flex items-center justify-center"
      variants={containerVariants}
      initial={initialState}
      animate="visible"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`display-${settings.effects.fadeInMode ?? 'none'}-${settings.text}-${settings.fontSize}-${settings.fontFamily}-${settings.fontWeight}-${settings.textColor}-${settings.gradient.enabled}-${settings.gradient.direction}-${settings.gradient.colors.start}-${settings.gradient.colors.end}`}
          initial={(() => {
            const mode = settings.effects.fadeInMode;
            if (!mode || mode === 'none') return { opacity: 1, scale: 1, y: 0 };
            if (mode === 'fade') return { opacity: 0, scale: 1, y: 0 };
            if (mode === 'slide-up') return { opacity: 0, y: 24, scale: 1 };
            if (mode === 'slide-down') return { opacity: 0, y: -24, scale: 1 };
            if (mode === 'slide-left') return { opacity: 0, x: 24, scale: 1 };
            if (mode === 'slide-right') return { opacity: 0, x: -24, scale: 1 };
            if (mode === 'zoom-in') return { opacity: 0, scale: 0.95, y: 0 };
            if (mode === 'bounce-in') return { opacity: 0, scale: 0.9, y: 0 };
            if (mode === 'flip-in-x') return { opacity: 0, rotateX: -90 } as any;
            if (mode === 'flip-in-y') return { opacity: 0, rotateY: -90 } as any;
            if (mode === 'rotate-in') return { opacity: 0, rotate: -8 } as any;
            if (mode === 'typewriter') return { opacity: 1, scale: 1 };
            return { opacity: 0 };
          })()}
          animate={(() => {
            const mode = settings.effects.fadeInMode;
            if (mode === 'bounce-in') return { opacity: 1, scale: [0.9, 1.05, 1], y: 0, transition: { duration: 0.5 } } as any;
            if (mode === 'flip-in-x') return { opacity: 1, rotateX: 0, transition: { duration: 0.4 } } as any;
            if (mode === 'flip-in-y') return { opacity: 1, rotateY: 0, transition: { duration: 0.4 } } as any;
            if (mode === 'rotate-in') return { opacity: 1, rotate: 0, transition: { duration: 0.3 } } as any;
            return { opacity: 1, scale: 1, x: 0, y: 0 };
          })()}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          style={{ filter: settings.effects.hoverGlow && isHovering ? getHoverFilter() : 'none', transition: 'filter 120ms ease' }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {settings.effects.fadeInMode === 'typewriter' ? (
            <div style={{ display: 'grid', gap: '6px', width: '100%' }}>
              {(() => {
                // Animate characters, but style is applied per-word
                let globalWordIndex = 0;
                let delayCounter = 0;
                return settings.text.split('\n').map((line, lineIndex) => {
                  const lineStyle: React.CSSProperties = {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '4px',
                    lineHeight: settings.lineHeight,
                    ...(settings.gradient.enabled ? getGradientStyle() : {})
                  };

                  const words = line.split(' ').filter(Boolean);
                  return (
                    <div key={`tw-line-${lineIndex}`} style={lineStyle}>
                      {words.map((word) => {
                        const thisWordIndex = globalWordIndex;
                        globalWordIndex += 1;
                        const chars = Array.from(word);
                        const wordStyle = getWordStyle(word, thisWordIndex);
                        return (
                          <span key={`tw-w-${lineIndex}-${thisWordIndex}`} style={wordStyle}>
                            {chars.map((ch, ci) => {
                              const d = delayCounter * 0.05;
                              delayCounter += 1;
                              return (
                                <motion.span
                                  key={`tw-ch-${lineIndex}-${thisWordIndex}-${ci}`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: d, duration: 0.001 }}
                                  style={{ display: 'inline-block' }}
                                >
                                  {ch}
                                </motion.span>
                              );
                            })}
                          </span>
                        );
                      })}
                    </div>
                  );
                });
              })()}
              <span className="type-caret" />
            </div>
          ) : settings.effects.perLetterAnimation ? (
            <div style={{ display: 'grid', gap: '6px', width: '100%' }}>
              {(() => {
                let globalIndex = 0;
                return settings.text.split('\n').map((line, lineIndex) => (
                  <motion.div
                    key={`line-${lineIndex}`}
                    variants={containerVariants}
                    initial={initialState}
                    animate="visible"
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', lineHeight: settings.lineHeight, ...(settings.gradient.enabled ? getGradientStyle() : {}) }}
                  >
                    {line.split(' ').filter(Boolean).map((word) => {
                      const element = (
                        <motion.span
                          key={`w-${lineIndex}-${globalIndex}`}
                          variants={wordVariants}
                          style={getWordStyle(word, globalIndex)}
                        >
                          {word}
                        </motion.span>
                      );
                      globalIndex += 1;
                      return element;
                    })}
                  </motion.div>
                ));
              })()}
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '6px', width: '100%' }}>
              {(() => {
                let globalIndex = 0;
                return settings.text.split('\n').map((line, lineIndex) => (
                  <div key={`line-${lineIndex}`} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px', lineHeight: settings.lineHeight, ...(settings.gradient.enabled ? getGradientStyle() : {}) }}>
                    {line.split(' ').filter(Boolean).map((word) => {
                      const element = (
                        <span
                          key={`w-${lineIndex}-${globalIndex}`}
                          style={getWordStyle(word, globalIndex)}
                        >
                          {word}
                        </span>
                      );
                      globalIndex += 1;
                      return element;
                    })}
                  </div>
                ));
              })()}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default HeadlineWidget;
