<script lang="ts">
  import mic from './mic.png?run&width=86'
  import Image from '$lib/Image.svelte'
  let loaded = false
  let filterId: string
</script>

<div class="inline-flex align-middle items-center relative -t-1 cursor-not-allowed text-lg font-medium [text-shadow:0_0_2px_rgba(0,0,0,0.25)] gap-7">
    <div class="relative aspect-square h-[5.4375rem] flex-shrink-0">
        <!-- Backdrop blur -->
        <div class="inset-0 absolute backdrop-blur-[8px] rounded-full" />
        <!-- Stroke with shadows -->
        <svg class="absolute inset-0" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_di_582_9)">
            <circle cx="43.5" cy="43.5" r="39.5" fill="white" fill-opacity="0.06"/>
            <circle cx="43.5" cy="43.5" r="40" stroke="url(#paint0_linear_582_9)" vector-effect="non-scaling-stroke"/>
            </g>
            <defs>
            <filter id="filter0_di_582_9" x="0" y="0" width="87" height="87" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="1.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_582_9"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_582_9" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset/>
            <feGaussianBlur stdDeviation="1"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_582_9"/>
            </filter>
            <linearGradient id="paint0_linear_582_9" x1="25" y1="4" x2="59.5" y2="83" gradientUnits="userSpaceOnUse">
            <stop stop-color="white" stop-opacity="0.92"/>
            <stop offset="1" stop-color="white" stop-opacity="0.37"/>
            </linearGradient>
            </defs>
        </svg>
        <!-- Mic -->
        <Image src={mic} bind:loaded bind:filterId class="!bg-none absolute h-1/2 w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" alt="" />
        <!-- Arrow -->
        <div class="w-8 rounded-full bg-white aspect-square absolute left-full top-1/2 -translate-x-2/3 -translate-y-1/2">

        </div>
    </div>
    Join for free
</div>