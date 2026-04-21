// =============================================================================
// Design Tokens — Single source of truth for all components
// =============================================================================

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const Colors = {
  // Backgrounds
  bg: '#0C0C16',
  surface: '#12122A',
  surfaceAlt: '#1A1A35',
  surfaceHigh: '#22223F',
  border: '#2C2C52',

  // Brand — Primary
  primary: '#7C6FFC',
  primaryLight: '#9D93FD',
  primaryDim: 'rgba(124, 111, 252, 0.15)',
  primaryGlow: 'rgba(124, 111, 252, 0.35)',

  // Feedback — Correct
  success: '#34D399',
  successDim: 'rgba(52, 211, 153, 0.15)',
  successGlow: 'rgba(52, 211, 153, 0.30)',

  // Feedback — Incorrect
  error: '#F87171',
  errorDim: 'rgba(248, 113, 113, 0.15)',
  errorGlow: 'rgba(248, 113, 113, 0.30)',

  // Text
  textPrimary: '#F0EEFF',
  textSecondary: '#8887A5',
  textMuted: '#5A5A78',

  // Utility
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
} as const;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const FontFamily = {
  // Space Grotesk — Display & Headings
  displayMedium:   'SpaceGrotesk_500Medium',
  displaySemibold: 'SpaceGrotesk_600SemiBold',
  displayBold:     'SpaceGrotesk_700Bold',

  // Inter — Body & UI
  body:         'Inter_400Regular',
  bodyMedium:   'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

export const LineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const LetterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
} as const;

// Typography presets — weight is baked into fontFamily, do not set fontWeight separately
export const TextStyle = {
  // Space Grotesk — Display & Headings
  '4xl': { fontFamily: FontFamily.displayBold,     fontSize: FontSize['4xl'] },
  '3xl': { fontFamily: FontFamily.displayBold,     fontSize: FontSize['3xl'] },
  '2xl': { fontFamily: FontFamily.displaySemibold, fontSize: FontSize['2xl'] },
  xl:    { fontFamily: FontFamily.displaySemibold, fontSize: FontSize.xl },

  // Inter — Body & UI
  lg:   { fontFamily: FontFamily.bodyMedium,   fontSize: FontSize.lg },
  base: { fontFamily: FontFamily.bodySemibold, fontSize: FontSize.base },
  md:   { fontFamily: FontFamily.body,         fontSize: FontSize.md },
  sm:   { fontFamily: FontFamily.bodyMedium,   fontSize: FontSize.sm },
  xs:   { fontFamily: FontFamily.bodyMedium,   fontSize: FontSize.xs },
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const Spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

export const Shadow = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  primary: {
    shadowColor: '#7C6FFC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  success: {
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 12,
    elevation: 6,
  },
  error: {
    shadowColor: '#F87171',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// ---------------------------------------------------------------------------
// Z-Index
// ---------------------------------------------------------------------------

export const ZIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
} as const;

// ---------------------------------------------------------------------------
// Animation Durations
// ---------------------------------------------------------------------------

export const Duration = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
} as const;

// ---------------------------------------------------------------------------
// Type exports
// ---------------------------------------------------------------------------

export type ColorToken = typeof Colors;
export type SpacingToken = typeof Spacing;
export type FontSizeToken = typeof FontSize;
export type FontWeightToken = typeof FontWeight;
export type BorderRadiusToken = typeof BorderRadius;
export type ShadowToken = typeof Shadow;
