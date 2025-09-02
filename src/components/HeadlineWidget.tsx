import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeadlineSettings } from '../types';

interface HeadlineWidgetProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

const HeadlineWidget: React.FC<HeadlineWidgetProps> = ({ settings, onSettingsChange }) => {
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
      color: settings.gradient.enabled ? 'transparent' as any : undefined
    } as React.CSSProperties;
  };

  const getTextShadow = () => {
    if (!settings.effects.textShadow) return 'none';
    return `0 0 ${settings.effects.shadowBlur}px ${settings.effects.shadowColor}`;
  };

  const getHoverFilter = () => {
    const blur = Math.max(10, settings.effects.shadowBlur + 8);
    return `drop-shadow(0 0 ${blur}px ${settings.effects.shadowColor})`;
  };

  const getWordStyle = (word: string, index: number) => {
    const baseStyle: React.CSSProperties = {
      fontSize: `${settings.fontSize}px`,
      fontFamily: settings.fontFamily,
      fontWeight: settings.fontWeight,
      textShadow: getTextShadow()
    };
    // Apply gradient only when not using highlight/background block
    const shouldApplyGradient =
      settings.gradient.enabled &&
      !settings.wordStyling.highlight &&
      !settings.wordStyling.backgroundBlock;
    const finalBase = shouldApplyGradient ? { ...baseStyle, ...getGradientStyle() } : baseStyle;

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
      return {
        ...baseStyle, // deliberately skip gradient so text is visible over block
        backgroundColor: settings.wordStyling.blockColor,
        padding: '4px 8px',
        borderRadius: '6px',
        display: 'inline-block',
        margin: '0 2px'
      };
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
      className="mx-auto my-6 w-full cursor-default select-none text-center p-12 rounded-3xl bg-white ring-1 ring-gray-200 min-h-[220px] flex items-center justify-center"
      variants={containerVariants}
      initial={initialState}
      animate="visible"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`display-${settings.effects.fadeInMode ?? 'none'}-${settings.text}-${settings.fontSize}`}
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
            <div style={{ display: 'inline-block' }}>
              {settings.text.split('').map((ch, i) => (
                <motion.span
                  key={`ch-${i}-${ch}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.001 }}
                  style={ch === ' ' ? { display: 'inline-block', width: '0.5ch' } : getWordStyle(ch, i)}
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
              <span className="type-caret" />
            </div>
          ) : settings.effects.perLetterAnimation ? (
            <motion.div
              variants={containerVariants}
              initial={initialState}
              animate="visible"
              style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}
            >
              {settings.text.split(' ').map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  variants={wordVariants}
                  style={getWordStyle(word, wordIndex)}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
              {settings.text.split(' ').map((word, wordIndex) => (
                <span
                  key={wordIndex}
                  style={getWordStyle(word, wordIndex)}
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default HeadlineWidget;
