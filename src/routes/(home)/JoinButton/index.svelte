<script lang="ts">
	import mic from './mic.png?run&width=86'
	import Image from '$lib/Image.svelte'
	import Arrow from '$lib/icons/Arrow.svelte'
	import { spring } from 'svelte/motion'
	let cls = ''
	export { cls as class }

	const THRESHOLD = 8

	let arrow: HTMLElement
	let offset = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.025,
			damping: 0.35
		}
	)
	function handleMouseMove(event: MouseEvent) {
		let x = event.offsetX - (arrow.offsetLeft + arrow.offsetWidth / 2),
			y = event.offsetY - (arrow.offsetTop + arrow.offsetHeight / 2)
		const dist = Math.hypot(x, y)
		if (dist > THRESHOLD) {
			// scale down to threshold length
			x *= THRESHOLD / dist
			y *= THRESHOLD / dist
		}
		$offset = { x, y }
	}
	function handleMouseLeave() {
		$offset = { x: 0, y: 0 }
	}
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<div
	role="link"
	on:mouseenter={handleMouseMove}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	class="{cls} inline-flex group align-middle items-center relative -t-1 cursor-not-allowed text-lg font-medium [text-shadow:0_0_2px_rgba(0,0,0,0.25)] gap-7"
>
	<div
		class="relative aspect-square h-[5.4375rem] flex-shrink-0 group-hover:scale-95 transition duration-300 will-change-transform pointer-events-none"
	>
		<!-- Backdrop blur -->
		<div class="inset-0 absolute backdrop-blur-[8px] rounded-full" />
		<!-- Stroke with shadows -->
		<svg
			class="absolute inset-0"
			viewBox="0 0 87 87"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g filter="url(#filter0_di_582_9)">
				<circle cx="43.5" cy="43.5" r="39.5" fill="white" fill-opacity="0.06" />
				<circle
					cx="43.5"
					cy="43.5"
					r="40"
					stroke="url(#paint0_linear_582_9)"
					vector-effect="non-scaling-stroke"
				/>
			</g>
			<defs>
				<filter
					id="filter0_di_582_9"
					x="0"
					y="0"
					width="87"
					height="87"
					filterUnits="userSpaceOnUse"
					color-interpolation-filters="sRGB"
				>
					<feFlood flood-opacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1.5" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_582_9" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_582_9" result="shape" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset />
					<feGaussianBlur stdDeviation="1" />
					<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
					<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
					<feBlend mode="normal" in2="shape" result="effect2_innerShadow_582_9" />
				</filter>
				<linearGradient
					id="paint0_linear_582_9"
					x1="25"
					y1="4"
					x2="59.5"
					y2="83"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" stop-opacity="0.92" />
					<stop offset="1" stop-color="white" stop-opacity="0.37" />
				</linearGradient>
			</defs>
		</svg>
		<!-- Mic -->
		<Image
			src={mic}
			class="!bg-none absolute h-1/2 w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			alt=""
		/>
		<!-- Arrow -->
		<div
			bind:this={arrow}
			class="w-8 aspect-square absolute left-full top-1/2 -ml-5 -mt-4 will-change-transform"
			style:transform="translate({$offset.x}px, {$offset.y}px)"
		>
			<div
				class="bg-white absolute inset-0 rounded-full flex items-center justify-center group-hover:scale-[130%] transition duration-250"
			>
				<div class="relative -rotate-45 overflow-hidden text-gray-900">
					<Arrow class="h-3 group-hover:translate-x-[130%] transition duration-250" />
					<Arrow
						class="h-full left-0 absolute top-0 -translate-x-[130%] group-hover:translate-x-0 transition duration-250"
					/>
				</div>
			</div>
		</div>
	</div>
	<span class="overflow-hidden block relative pointer-events-none">
		<span class="block group-hover:-translate-y-[120%] group-hover:skew-y-6 transition duration-300"
			>Join for free</span
		>
		<span
			class="absolute inset-0 translate-y-[120%] group-hover:translate-y-0 skew-y-6 group-hover:skew-y-0 transition duration-300"
			aria-hidden>Join for free</span
		>
	</span>
</div>
