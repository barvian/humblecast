import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import clipPathPlugin from 'tailwind-clip-path'
import imageRenderingPlugin from 'tailwindcss-image-rendering'
import containerQueryPlugin from '@tailwindcss/container-queries'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			black: '#000',
			white: '#fff',
			current: 'currentColor',
			gray: {
				900: '#1d1d1d'
			}
		},
		extend: {
			transitionDuration: {
				250: '250ms'
			},
			borderColor: {
				DEFAULT: 'currentColor'
			},
			screens: {
				xs: '480px'
			},
			fontFamily: {
				sans: ['Degular', 'sans-serif']
			},
			fontSize: {
				// https://royalfig.github.io/fluid-typography-calculator/
				'2xl': 'clamp(1.5rem, 1.167rem + 1.667vw, 2.5rem)',
				'3xl': 'clamp(3rem, 1.833rem + 5.83vw, 6.5rem)',
				'4xl': 'clamp(4rem, 2.8043478260869565rem + 5.978260869565218vw, 7.4375rem)'
			},
			backgroundImage: {
			},
			spacing: {
				'lg': 'clamp(2.00rem, calc(1.91rem + 0.43vw), 2.25rem)',
				'xl': 'clamp(2.00rem, calc(1.52rem + 2.39vw), 3.38rem)',
				'2xl': 'clamp(3.00rem, calc(2.48rem + 2.61vw), 4.50rem)'
			},
			letterSpacing: {
				tighter: '-.04em'
			},
			lineHeight: {
				relaxed: '1.62',
				loose: '1.955'
			},
			dropShadow: {
			},
			animation: {
				blink: 'blink 1s step-end infinite',
				flicker: 'flicker 1s linear 1',
				'float-1': 'float-2 8s ease-in-out 0.5s infinite normal'
			},
			keyframes: {
				'float-1': {
					'0%, 100%': {
						transform: 'translateX(0)'
					},
					'50%': {
						transform: 'translateX(-0.25rem)'
					}
				}
			},
			transitionTimingFunction: {
				'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
				'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
			}
		}
	},
	plugins: [
		clipPathPlugin,
		containerQueryPlugin,
		plugin(({ addVariant }) => {
			addVariant('js', '[data-js]:root &')
			addVariant('no-js', ':root:not([data-js]) &')
			addVariant('loaded', [':root:not([data-js]) &', '&[data-loaded]'])
			addVariant('fonts-loaded', [':root:not([data-js]) &', '[data-fonts-loaded]:root &'])
			addVariant('entered', [
				'&[data-observe-entered]',
				'[data-observe-entered] &',
				':root:not([data-js]) &'
			])
			addVariant('entered-fonts-loaded', [
				'[data-fonts-loaded]:root &[data-observe-entered]',
				'[data-fonts-loaded]:root [data-observe-entered] &',
				':root:not([data-js]) &'
			])
			addVariant('entering', ['&[data-observe-entered]', '[data-observe-entering] &'])
		})
	]
} satisfies Config
