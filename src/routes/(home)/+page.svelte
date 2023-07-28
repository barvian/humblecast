<script lang="ts">
	import { observe } from '$lib/actions'
  import Noise from './Noise/index.svelte'

  let mouse: { x: number, y: number } | undefined
</script>

<svelte:head>
	<title>Humblecast</title>
	<meta name="description" content="Maxwell Barvian's take on Awsmd's design." />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header class="relative bg-[#0f7Bf9] min-h-[50vw]" on:mousemove={({ x, y }) => mouse = { x, y }}>
	<Noise {mouse} />
	<div class="container relative">
		<nav>
			humblecast
		</nav>
		<h1>
			Create and
			<div aria-hidden class="cursor-not-allowed">
				Join for free
			</div>
			monetize your podcast
		</h1>
		<p>
			Distribute your podcast to the most popular listening apps,
			including Spotify with just a few simple steps.
		</p>
		<div>
			<div role="button">
				Get started
			</div>
			<div role="button">
				Switch to Humblecast
			</div>
		</div>
		<!-- Scroll down arrow -->
		<div class="" aria-hidden>
	
		</div>
	</div>
</header>