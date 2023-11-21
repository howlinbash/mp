import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        blue: {
          '500': '#0050FF'
        },
        gray: {
          // Prefer Adobe Spectrum colorscheme over tailwind
          '50': '#F8FAFC',
          '200': '#E2E8F0',
          '300': '#CBD5E1',
          '500': '#64748B',
          '700': '#334155',
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      maxWidth: {
        '4/4': '920px'
      },
      spacing: {
        '13': '52px'
      }
    },
  },
  plugins: [],
} satisfies Config;
