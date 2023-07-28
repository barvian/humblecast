<script lang="ts">
	import { observe } from '$lib/actions'
  import Noise from './Noise/index.svelte'
</script>

<svelte:head>
	<title>Humblecast</title>
	<meta name="description" content="Maxwell Barvian's take on Awsmd's design." />
</svelte:head>

<header class="relative">
	<Noise />
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
</header>