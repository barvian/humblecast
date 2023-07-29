<script context="module">
	let i = 0
</script>
<script lang="ts">
	// Expose a loaded prop to bind to from SvelteImg
	import SvelteImg from '@zerodevx/svelte-img'
	import { onMount, type ComponentProps } from 'svelte'
	import type { HTMLImgAttributes } from 'svelte/elements'
	import { tweened } from 'svelte/motion';
	import { expoOut } from 'svelte/easing';

	i++
	export let filterId = `distortion-${i}`
	export let duration = 1000
	export let scale = 150

	let cls = ''
	export { cls as class }

	let width = $$props.src[0].width, height = $$props.src[0].height

	type $$Props = Omit<HTMLImgAttributes, 'src'> &
		ComponentProps<SvelteImg> & {
			class?: string,
			loaded?: boolean,
			duration?: number,
			filterId?: string
		}

	let ref: HTMLImageElement
	export let loaded = false
	onMount(() => {
		if (ref.complete) loaded = true
	})

	let filterScale = tweened(-scale, {
		duration,
		easing: expoOut
	})
	$: if (loaded) $filterScale = 0
</script>

<svg {width} {height} viewBox="0 0 {width} {height}" class="sr-only">
	<filter id={filterId}>
		<feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" numOctaves="5" seed="2" stitchTiles="noStitch" x="0%" y="0%" width="100%" height="100%" result="noise" />
		<feDisplacementMap in="SourceGraphic" in2="noise" scale={$filterScale} xChannelSelector="R" yChannelSelector="B" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" />
	</filter>
</svg>
<SvelteImg {...$$restProps} class="ease-out-expo transform {cls}" style="filter: url(#{filterId}); --tw-scale-y: {loaded ? 100 : scale}%; transition-property: opacity, transform; transition-duration: {duration}ms;" data-loaded={loaded ? '' : undefined} bind:ref on:load={() => { loaded = true }} />
