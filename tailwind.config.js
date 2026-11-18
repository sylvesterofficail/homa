/** Design tokens live in app/globals.css as CSS variables; Tailwind maps to them. */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ink: 'rgb(var(--ink) / <alpha-value>)',
      muted: 'rgb(var(--muted) / <alpha-value>)',
      paper: 'rgb(var(--paper) / <alpha-value>)',
      raised: 'rgb(var(--raised) / <alpha-value>)',
      olive: 'rgb(var(--olive) / <alpha-value>)',
      moss: 'rgb(var(--moss) / <alpha-value>)',
      sage: 'rgb(var(--sage) / <alpha-value>)',
      gold: 'rgb(var(--gold) / <alpha-value>)',
      jacquard: 'rgb(var(--jacquard) / <alpha-value>)',
      cream: 'rgb(var(--cream) / <alpha-value>)',
      line: 'rgb(var(--ink) / 0.14)',
      success: '#3f8f5a',
      warning: '#c58a1e',
      error: '#b5122b',
    },
    fontFamily: {
      display: ['var(--font-display)', 'Didot', '"Bodoni 72"', 'Georgia', 'serif'],
      sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.5' }],      // 12
      sm: ['0.875rem', { lineHeight: '1.55' }],    // 14
      base: ['1rem', { lineHeight: '1.65' }],      // 16
      lg: ['1.25rem', { lineHeight: '1.5' }],      // 20
      xl: ['1.5rem', { lineHeight: '1.35' }],      // 24
      '2xl': ['2rem', { lineHeight: '1.2' }],      // 32
      '3xl': ['3rem', { lineHeight: '1.08' }],     // 48
      '4xl': ['4rem', { lineHeight: '1.02' }],     // 64
    },
    borderRadius: { none: '0', sm: '4px', DEFAULT: '4px', lg: '12px', full: '9999px' },
    extend: {
      boxShadow: { lift: '0 24px 48px -24px rgb(25 30 25 / 0.35)' },
      transitionTimingFunction: { out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      maxWidth: { page: '76rem', measure: '36rem' },
    },
  },
  plugins: [],
};
