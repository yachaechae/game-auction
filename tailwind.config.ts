import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        navy: '#232537',
        point: '#E6941C',
        gold: '#dab644',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#E6941C',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#dab644',
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
