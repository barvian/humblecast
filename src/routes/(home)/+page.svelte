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
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'

	let mouse: { x: number; y: number } | undefined
	let joinDistort = tweened(0, {
		duration: 700,
		easing: cubicOut
	})
	const focusJoin = () => ($joinDistort = 0.025)
	const blurJoin = () => ($joinDistort = 0)
</script>

<svelte:head>
	<title>Humblecast</title>
	<meta name="description" content="Maxwell Barvian's take on Awsmd's design." />
</svelte:head>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header
	class="relative ~pt-5/10 ~pb-8/13.5 bg-[#0f7Bf9]"
	on:mousemove={({ x, y }) => (mouse = { x, y })}
>
	<Noise {mouse} />
	<div class="container @container relative">
		<nav class="flex items-center ~mb-8/13.5">
			<a href="/"><Logo /></a>
			<div
				class="hidden @5xl:flex gap-[2.5em] whitespace-nowrap font-medium text-lg [text-shadow:0_0_2px_rgba(0,0,0,0.25)] mx-auto"
			>
				<span class="cursor-not-allowed">Features</span>
				<span class="cursor-not-allowed">Switch to Humblecast</span>
				<span class="cursor-not-allowed">Pricing</span>
				<span class="cursor-not-allowed">Blog</span>
			</div>
			<div class="hidden @5xl:flex whitespace-nowrap items-stretch">
				<span
					class="cursor-not-allowed group text-lg font-medium rounded-full block py-[0.65em] px-[1.5em] [box-shadow:inset_0_0_2px_rgba(0,0,0,0.15),inset_0_0_0_1px_white,0_0_2px_rgba(0,0,0,0.2)] relative overflow-hidden"
				>
					<span class="block relative overflow-hidden">
						<span
							class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition duration-250 [text-shadow:0_0_2px_rgba(0,0,0,0.25)]"
							>Log in</span
						>
					</span>
					<div
						aria-hidden
						class="absolute p-[inherit] inset-0 opacity-0 group-hover:opacity-100 transition bg-white duration-250"
					>
						<span class="block overflow-hidden">
							<span
								class="block skew-y-6 group-hover:skew-y-0 translate-y-full group-hover:translate-y-0 transition duration-250 text-gray-900"
								>Log in</span
							>
						</span>
					</div>
				</span>
				<span
					class="flex items-center group transition-all gap-0 hover:gap-3 cursor-not-allowed text-lg font-medium bg-white rounded-full text-[#000322] py-[0.65em] px-[1.5em]"
				>
					<span class="block relative overflow-hidden">
						<span
							class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition duration-250"
							>Sign up</span
						>
						<span
							aria-hidden
							class="absolute top-full left-0 skew-y-6 group-hover:skew-y-0 group-hover:-translate-y-full transition duration-250"
							>Sign up</span
						>
					</span>
					<Arrow class="h-0 group-hover:h-3.5 transition-all duration-200" />
				</span>
			</div>
			<div class="flex flex-col w-6 h-4 items-stretch justify-between ml-auto @5xl:hidden">
				<div class="bg-white h-0.5 rounded-full" />
				<div class="bg-white h-0.5 rounded-full" />
				<div class="bg-white h-0.5 rounded-full" />
			</div>
		</nav>
		<h1 class="~text-[4rem]/[7.4375rem] leading-[85.5%] @6xl:leading-[75%] font-semibold ~mb-8/13.5">
			Create and
			<JoinButton class="hidden @6xl:inline-flex" />
			monetize your podcast
		</h1>
		<p class="text-lg [text-shadow:0_0_2px_rgba(0,0,0,0.25)] max-w-[45ch]">
			Distribute your podcast to the most popular listening apps, including Spotify, with just a few
			simple steps.
		</p>
		<div class="flex flex-wrap whitespace-nowrap items-stretch ~mt-[2rem]/[2.25rem]">
			<!-- Have to add bottom margin to all these to give them spacing on mobile, where touch targets are smaller -->
			<span
				class="flex mb-4 items-center group gap-3 transition-all hover:gap-5 cursor-not-allowed text-lg font-medium bg-white rounded-full text-[#000322] py-[0.75em] px-[1.5em]"
			>
				<span class="block relative overflow-hidden">
					<span
						class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition duration-250"
						>Get started</span
					>
					<span
						aria-hidden
						class="absolute top-full left-0 skew-y-6 group-hover:skew-y-0 group-hover:-translate-y-full transition duration-250"
						>Get started</span
					>
				</span>
				<Arrow class="h-3" />
			</span>
			<span
				class="cursor-not-allowed mb-4 group text-lg font-medium rounded-full block py-[0.75em] px-[1.5em] [box-shadow:inset_0_0_2px_rgba(0,0,0,0.15),inset_0_0_0_1px_white,0_0_2px_rgba(0,0,0,0.2)] relative overflow-hidden"
			>
				<span class="block relative overflow-hidden">
					<span
						class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition duration-250 [text-shadow:0_0_2px_rgba(0,0,0,0.25)]"
						>Switch to Humblecast</span
					>
				</span>
				<div
					aria-hidden
					class="absolute p-[inherit] inset-0 opacity-0 group-hover:opacity-100 transition bg-white duration-250"
				>
					<span class="block overflow-hidden">
						<span
							class="block skew-y-6 group-hover:skew-y-0 translate-y-full group-hover:translate-y-0 transition duration-250 text-gray-900"
							>Switch to Humblecast</span
						>
					</span>
				</div>
			</span>
			<div class="ml-auto mb-4 relative hidden @2xl:block" aria-hidden>
				<a
					href="#content"
					class="rounded-full group hover:scale-110 transition duration-250 shadow-[inset_0_0_0_2px_white] flex items-center justify-center aspect-square absolute top-0 right-0 h-full before:inset-0 before:absolute before:border-2 before:border-white/30 before:rounded-full before:animate-pulse hover:before:!opacity-0 before:transition before:duration-250 hover:before:animate-[none] before:pointer-events-none"
				>
					<div
						class="absolute bg-white rounded-full inset-0 group-hover:opacity-0 transition duration-250"
					/>
					<div class="relative">
						<Arrow
							class="h-3.5 rotate-90 text-gray-900 group-hover:translate-y-2 transition duration-200 group-hover:opacity-0"
						/>
						<Arrow
							class="absolute h-full rotate-90 top-0 -translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-200"
						/>
					</div>
				</a>
			</div>
		</div>
	</div>
</header>
<main class="~py-12/18" id="content">
	<div class="container grid grid-cols-1 sm:grid-cols-2 ~gap-12/18 items-start">
		<div class="flex items-stretch w-full max-sm:order-1">
			<div class="rounded-l-full bg-[#d4dcde] flex-1 relative overflow-hidden">
				<Image
					src={man}
					class="object-cover object-center w-full h-full absolute inset-0 opacity-0 loaded:opacity-100 transition duration-700"
				/>
			</div>
			<div
				class="rounded-full self-center flex-shrink-0 bg-white w-[19%] aspect-square flex items-center justify-center gap-[5%]"
			>
				<div class="w-[5%] flex flex-col items-stretch h-1/3 animate-waveform">
					<div
						class="rounded-t-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-bottom translate-y-[1px]"
					/>
					<div class="flex-1 bg-gray-900" />
					<div
						class="rounded-b-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-top -translate-y-[1px]"
					/>
				</div>
				<div
					class="w-[5%] flex flex-col items-stretch h-1/5 animate-waveform [animation-delay:-0.25s]"
				>
					<div
						class="rounded-t-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-bottom translate-y-[1px]"
					/>
					<div class="flex-1 bg-gray-900" />
					<div
						class="rounded-b-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-top -translate-y-[1px]"
					/>
				</div>
				<div
					class="w-[5%] flex flex-col items-stretch h-1/2 animate-waveform [animation-delay:-0.5s]"
				>
					<div
						class="rounded-t-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-bottom translate-y-[1px]"
					/>
					<div class="flex-1 bg-gray-900" />
					<div
						class="rounded-b-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-top -translate-y-[1px]"
					/>
				</div>
				<div
					class="w-[5%] flex flex-col items-stretch h-1/6 animate-waveform [animation-delay:-0.75s]"
				>
					<div
						class="rounded-t-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-bottom translate-y-[1px]"
					/>
					<div class="flex-1 bg-gray-900" />
					<div
						class="rounded-b-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-top -translate-y-[1px]"
					/>
				</div>
				<div
					class="w-[5%] flex flex-col items-stretch h-1/3 animate-waveform [animation-delay:-1s]"
				>
					<div
						class="rounded-t-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-bottom translate-y-[1px]"
					/>
					<div class="flex-1 bg-gray-900" />
					<div
						class="rounded-b-full aspect-square bg-gray-900 animate-waveform-inverse [animation-delay:inherit] origin-top -translate-y-[1px]"
					/>
				</div>
			</div>
			<div class="rounded-r-full border flex-shrink-0 border-white aspect-[0.5] w-[22.5%]" />
		</div>
		<div class="@container">
			<div class="grid grid-cols-1 @md:grid-cols-[1fr_min-content] items-center gap-6">
				<span class="uppercase font-semibold ~text-[3rem]/[6.5rem] leading-[85%]">873k</span>
				<span class="font-semibold ~text-[1.5rem]/[2.5rem] leading-[.85] @md:-order-1"
					>Active creators<br />and listeners</span
				>
				<hr class="@md:col-span-2 border-white border-DEFAULT" />
				<div class="whitespace-nowrap self-start @md:mt-2 order-last @md:order-[unset]">
					<div
						class="w-10 inline-block hover:-translate-y-1.5 transition align-middle relative bg-white border-2 border-gray-900 aspect-square rounded-full will-change-transform overflow-hidden"
					>
						<Image
							src={girl}
							alt="User headshot"
							class="w-full h-full object-cover opacity-0 loaded:opacity-100 transition duration-500"
						/>
					</div>
					<div
						class="w-10 inline-block -ml-4 hover:-translate-y-1.5 transition align-middle relative bg-white border-2 border-gray-900 aspect-square rounded-full will-change-transform overflow-hidden"
					>
						<Image
							src={girl2}
							alt="User headshot"
							class="w-full h-full object-cover opacity-0 loaded:opacity-100 transition duration-500"
						/>
					</div>
					<div
						role="link"
						tabindex="0"
						on:mouseover={focusJoin}
						on:mouseout={blurJoin}
						on:focus={focusJoin}
						on:blur={blurJoin}
						class="inline-flex items-center align-middle gap-4 relative -ml-4 cursor-not-allowed group"
					>
						<div
							class="bg-white flex items-center justify-center flex-shrink-0 group-hover:-translate-y-1.5 transition border-2 border-gray-900 w-10 aspect-square rounded-full overflow-hidden"
						>
							<svg class="w-3" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
								<line
									x1="6"
									y1="0"
									x2="6"
									y2="12"
									stroke="black"
									stroke-width="2"
									vector-effect="non-scaling-stroke"
								/>
								<line
									y1="6"
									x2="12"
									y2="6"
									stroke="black"
									stroke-width="2"
									vector-effect="non-scaling-stroke"
								/>
							</svg>
						</div>
						<span class="font-medium relative">
							<svg class="sr-only">
								<defs>
									<filter id="distortion-1">
										<feTurbulence
											type="fractalNoise"
											baseFrequency={$joinDistort}
											numOctaves="1"
											result="warp"
										/>
										<feOffset dx="-90" result="warpOffset" />
										<feDisplacementMap
											xChannelSelector="R"
											yChannelSelector="G"
											scale="20"
											in="SourceGraphic"
											in2="warpOffset"
										/>
									</filter>
								</defs>
							</svg>
							Join them
							<div
								class="bg-white [filter:url(#distortion-1)] [outline:120px_solid_transparent] left-0 right-0 -bottom-[0.2em] h-[1px] group-hover:translate-y-1 transition duration-500"
							/>
						</span>
					</div>
				</div>
				<p>The number of active podcasts and their quality is constantly growing.</p>
			</div>
		</div>
	</div>
</main>
