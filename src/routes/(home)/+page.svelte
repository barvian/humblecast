<script lang="ts">
	import { observe } from '$lib/actions'
  import Logo from '$lib/icons/Logo.svelte'
  import Noise from './Noise/index.svelte'
  import JoinButton from './JoinButton/index.svelte'
  import girl from './girl.jpg?run&width=80'
  import girl2 from './girl2.jpg?run&width=80'
  import man from './man.jpg?run&width=432'
  import Arrow from '$lib/icons/Arrow.svelte'
  import Image from '$lib/Image.svelte'

  let mouse: { x: number, y: number } | undefined
</script>

<svelte:head>
	<title>Humblecast</title>
	<meta name="description" content="Maxwell Barvian's take on Awsmd's design." />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header class="relative pt-[clamp(theme(padding.5),4vw,theme(padding.10))] pb-2xl bg-[#0f7Bf9]" on:mousemove={({ x, y }) => mouse = { x, y }}>
	<Noise {mouse} />
	<div class="container @container relative">
		<nav class="flex items-center mb-xl">
			<a href="/"><Logo /></a>
			<div class="hidden @5xl:flex gap-[2.5em] whitespace-nowrap font-medium text-lg [text-shadow:0_0_2px_rgba(0,0,0,0.25)] mx-auto">
				<span class="cursor-not-allowed">Features</span>
				<span class="cursor-not-allowed">Switch to Humblecast</span>
				<span class="cursor-not-allowed">Pricing</span>
				<span class="cursor-not-allowed">Blog</span>
			</div>
			<div class="hidden @5xl:flex whitespace-nowrap items-stretch">
				<span class="cursor-not-allowed text-lg font-medium border rounded-full block py-[0.65em] px-[1.5em] [text-shadow:0_0_2px_rgba(0,0,0,0.25)] [box-shadow:inset_0_0_2px_rgba(0,0,0,0.15),0_0_2px_rgba(0,0,0,0.2)]">
					Log in
				</span>
				<span class="cursor-not-allowed text-lg font-medium bg-white rounded-full text-[#000322] block py-[0.65em] px-[1.5em]">
					Sign up
				</span>
			</div>
		</nav>
		<h1 class="text-4xl/[75.5%] font-semibold mb-xl">
			Create and
			<JoinButton />
			monetize your podcast
		</h1>
		<p class="text-lg [text-shadow:0_0_2px_rgba(0,0,0,0.25)] max-w-[45ch]">
			Distribute your podcast to the most popular listening apps,
			including Spotify, with just a few simple steps.
		</p>
		<div class="flex flex-wrap whitespace-nowrap items-stretch mt-lg">
			<span class="flex mb-4 items-center group gap-3 transition-all hover:gap-5 cursor-not-allowed text-lg font-medium bg-white rounded-full text-[#000322] py-[0.65em] px-[1.5em]">
				<span class="block relative overflow-hidden">
					<span class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition duration-250">Get started</span>
					<span aria-hidden class="absolute top-full left-0 skew-y-6 group-hover:skew-y-0 group-hover:-translate-y-full transition duration-250">Get started</span>
				</span>
				<Arrow class="h-3" />
			</span>
			<span class="cursor-not-allowed mb-4 group text-lg font-medium rounded-full block py-[0.65em] px-[1.5em] [box-shadow:inset_0_0_2px_rgba(0,0,0,0.15),inset_0_0_0_1px_white,0_0_2px_rgba(0,0,0,0.2)] relative overflow-hidden">
				<span class="block relative overflow-hidden">
					<span class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition duration-250 [text-shadow:0_0_2px_rgba(0,0,0,0.25)]">Switch to Humblecast</span>
				</span>
				<div aria-hidden class="absolute p-[inherit] inset-0 opacity-0 group-hover:opacity-100 transition bg-white duration-250">
					<span class="block overflow-hidden">
						<span class="block skew-y-6 group-hover:skew-y-0 translate-y-full group-hover:translate-y-0 transition duration-250 text-gray-900">Switch to Humblecast</span>
					</span>
				</div>
			</span>
		</div>
		<!-- Scroll down arrow -->
		<div class="" aria-hidden>
	
		</div>
	</div>
</header>
<main class="py-2xl">
	<div class="container grid grid-cols-2 gap-2xl items-start">
		<div class="flex items-stretch w-full">
			<div class="rounded-l-full bg-[#d4dcde] flex-1 relative overflow-hidden">
				<Image src={man} class="object-cover object-center w-full h-full absolute inset-0" duration={1350} />
			</div>
			<div class="rounded-full self-center flex-shrink-0 bg-white w-[19%] aspect-square flex items-center justify-center gap-[5%]">
				<div class="w-[5%] bg-gray-900 rounded-full h-1/3" />
				<div class="w-[5%] bg-gray-900 rounded-full h-1/5" />
				<div class="w-[5%] bg-gray-900 rounded-full h-1/2" />
				<div class="w-[5%] bg-gray-900 rounded-full h-1/6" />
				<div class="w-[5%] bg-gray-900 rounded-full h-1/3" />
			</div>
			<div class="rounded-r-full border flex-shrink-0 border-white aspect-[0.5] w-[22.5%]">

			</div>
		</div>
		<div class="@container">
			<div class="grid grid-cols-1 @md:grid-cols-[1fr_min-content] items-center gap-6">
				<span class="uppercase font-semibold text-3xl/[85%]">873k</span>
				<span class="font-semibold text-2xl/[85%] @md:-order-1">Active creators<br/>and listeners</span>
				<hr class="@md:col-span-2 border-white border-DEFAULT" />
				<div class="whitespace-nowrap self-start mt-2 order-last @md:order-[unset]">
					<div class="w-10 inline-block hover:-translate-y-1.5 transition align-middle relative bg-white border-2 border-gray-900 aspect-square rounded-full will-change-transform overflow-hidden"><Image src={girl} alt="User headshot" class="w-full h-full object-cover" /></div>
					<div class="w-10 inline-block -ml-4 hover:-translate-y-1.5 transition align-middle relative bg-white border-2 border-gray-900 aspect-square rounded-full will-change-transform overflow-hidden"><Image src={girl2} alt="User headshot" class="w-full h-full object-cover" /></div>
					<div class="inline-flex items-center align-middle gap-4 relative -ml-4 cursor-not-allowed group">
						<div class="bg-white flex items-center justify-center flex-shrink-0 group-hover:-translate-y-1.5 transition border-2 border-gray-900 w-10 aspect-square rounded-full overflow-hidden">
							<svg class="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line x1="6" y1="0" x2="6" y2="12" stroke="black" stroke-width="2" vector-effect="non-scaling-stroke" />
								<line y1="6" x2="12" y2="6" stroke="black" stroke-width="2" vector-effect="non-scaling-stroke" />
							</svg>							
						</div>
						<span class="underline underline-offset-[0.35em] font-medium">Join them</span>
					</div>
				</div>
				<p>
					The number of active podcasts and their quality is constantly growing.
				</p>
			</div>
		</div>
	</div>
</main>