import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import clipPathPlugin from 'tailwind-clip-path'
import containerQueryPlugin from '@tailwindcss/container-queries'
import { fluidCorePlugins, buildFluidExtract, defaultScreensInRems } from '@fluid.style/tailwind'
const { '2xl': _, ...screens } = defaultScreensInRems

export default {
	content: {
		files: ['./src/**/*.{html,js,svelte,ts}'],
		extract: buildFluidExtract()
	},
	theme: {
		colors: {
			black: '#000',
			white: '#fff',
			current: 'currentColor',
			gray: {
				900: '#010625'
			}
		},
		screens: {
			...screens,
			xs: '30rem'
		},
		extend: {
			transitionDuration: {
				250: '250ms'
			},
			borderColor: {
				DEFAULT: 'currentColor'
			},
			fontFamily: {
				sans: ['Degular', 'sans-serif']
			},
			backgroundImage: {},
			spacing: {
				'13.5': '3.375rem',
				'18': '4.5rem'
			},
			letterSpacing: {
				tighter: '-.04em'
			},
			lineHeight: {
				relaxed: '1.62',
				loose: '1.955'
			},
			dropShadow: {},
			animation: {
				pulse: 'pulse 2s infinite',
				waveform: 'waveform 1.5s infinite both',
				'waveform-inverse': 'waveform-inverse 1.5s infinite both'
			},
			keyframes: {
				pulse: {
					'100%': {
						opacity: '0',
						transform: 'scale(150%)'
					}
				},
				waveform: {
					'0%, 100%': {
						transform: 'scaleY(0.2)'
					},
					'25%': {
						transform: 'scaleY(0.6)'
					},
					'50%': {
						transform: 'scaleY(1)'
					},
					'70%': {
						transform: 'scaleY(0.4)'
					},
					'80%': {
						transform: 'scaleY(0.75)'
					}
				},
				'waveform-inverse': {
					'0%, 100%': {
						transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) scaleY(5)'
					},
					'25%': {
						transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) scaleY(1.67)'
					},
					'50%': {
						transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) scaleY(1)'
					},
					'70%': {
						transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) scaleY(2.5)'
					},
					'80%': {
						transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) scaleY(1.333)'
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
		fluidCorePlugins,
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
