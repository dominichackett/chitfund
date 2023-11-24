import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        "my-red": {
          "light": "#FFB7C1",    // Lighter shade
          "DEFAULT": "#F50057",  // The original color
          "alt": "#FF4D6E",      // Alternate color 1
          "alt2": "#FF7083",     // Alternate color 2
          "alt3": "#FFD3D9",     // Alternate color 3
          "alt4": "#7F1D2E",     // Alternate color 4
          "alt5": "#A10246",     // Alternate color 5
          "alt6": "#D96678",      // Alternate color 6
          "alt7":"#E61030"
        }
        


      },
    },
  },
  plugins: [],
}
export default config
