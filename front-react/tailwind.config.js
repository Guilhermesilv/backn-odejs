/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: 'Sora'
  		},
  		colors: {
  			primary: {
  				'50': '#f0f9ff',
  				'100': '#e0f2fe',
  				'200': '#bae6fd',
  				'300': '#7dd3fc',
  				'400': '#38bdf8',
  				'500': '#6cb9d3',
  				'600': '#4a9bc7',
  				'700': '#377ba8',
  				'800': '#2d5a80',
  				'900': '#036c8a',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			neutral: {
  				'50': '#fafafa',
  				'100': '#f5f5f5',
  				'200': '#e5e5e5',
  				'300': '#d4d4d4',
  				'400': '#a3a3a3',
  				'500': '#737373',
  				'600': '#525252',
  				'700': '#404040',
  				'800': '#262626',
  				'900': '#171717'
  			},
  			success: {
  				'500': '#22c55e',
  				'600': '#16a34a'
  			},
  			warning: {
  				'500': '#f59e0b',
  				'600': '#d97706'
  			},
  			error: {
  				'500': '#ef4444',
  				'600': '#dc2626'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			pattern: 'url(/bg.png)',
  			'gradient-primary': 'linear-gradient(180deg, #036c8a 0%, #6cb9d3 100%)',
  			'gradient-primary-vertical': 'linear-gradient(0deg, #036c8a 0%, #6cb9d3 100%)',
  			'gradient-primary-horizontal': 'linear-gradient(90deg, #036c8a 0%, #6cb9d3 100%)',
  			'gradient-primary-diagonal': 'linear-gradient(45deg, #036c8a 0%, #6cb9d3 100%)',
  			'gradient-primary-reverse': 'linear-gradient(180deg, #6cb9d3 0%, #036c8a 100%)'
  		},
  		boxShadow: {
  			shape: '0px 8px 8px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.03), inset 0px 1px 0px rgba(255, 255, 255, 0.03)',
  			'primary-glow': '0 4px 6px -1px rgba(3, 108, 138, 0.1), 0 2px 4px -1px rgba(3, 108, 138, 0.06)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  				animation: {
			ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
			'shimmer-slide': 'shimmer-slide var(--speed) ease-in-out infinite alternate',
			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear'
		},
		keyframes: {
			ripple: {
				'0%, 100%': {
					transform: 'translate(-50%, -50%) scale(1)'
				},
				'50%': {
					transform: 'translate(-50%, -50%) scale(0.9)'
				}
			},
			'shimmer-slide': {
				to: {
					transform: 'translate(calc(100cqw - 100%), 0)'
				}
			},
			'spin-around': {
				'0%': {
					transform: 'translateZ(0) rotate(0)'
				},
				'15%, 35%': {
					transform: 'translateZ(0) rotate(90deg)'
				},
				'65%, 85%': {
					transform: 'translateZ(0) rotate(270deg)'
				},
				'100%': {
					transform: 'translateZ(0) rotate(360deg)'
				}
			}
		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}