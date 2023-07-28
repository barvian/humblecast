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
			current: 'currentColor',
			gray: {
				900: '#1d1d1d'
			}
		},
		extend: {
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
			},
			backgroundImage: {
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
