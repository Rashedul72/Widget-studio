export interface HeadlineSettings {
  text: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  textColor: string;
  wordColors: Record<number, string>;
  wordColorsEnabled: boolean;
  letterSpacing: number;
  lineHeight: number;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textOutline: {
    enabled: boolean;
    width: number;
    color: string;
  };
  gradient: {
    enabled: boolean;
    direction: 'right' | 'left' | 'down' | 'up';
    colors: {
      start: string;
      end: string;
    };
  };
  effects: {
    fadeIn: boolean; // legacy toggle
    fadeInMode?: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'bounce-in' | 'flip-in-x' | 'flip-in-y' | 'rotate-in' | 'typewriter';
    hoverGlow: boolean;
    hoverGlowColor: string;
    perLetterAnimation: boolean;
    textShadow: boolean;
    shadowColor: string;
    shadowBlur: number;
  };
  wordStyling: {
    highlight: boolean;
    underline: boolean;
    backgroundBlock: boolean;
    highlightColor: string;
    underlineColor: string;
    blockColor: string;
    blockBorderRadius: number;
    blockBoxShadow: {
      enabled: boolean;
      x: number;
      y: number;
      blur: number;
      color: string;
    };
  };
}

export interface ControlPanelProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}

export interface HeadlineWidgetProps {
  settings: HeadlineSettings;
  onSettingsChange: (settings: HeadlineSettings) => void;
}
