<script lang="ts">
    import { onMount } from "svelte"
    import { Renderer, Vec2, Vec4, Color, Flowmap, Geometry, Mesh, Program } from 'ogl'
    import fragment from './fragment.glsl?raw'
    import vertex from './vertex.glsl?raw'
    import { patchShaders } from 'gl-noise/build/glNoise.m'

    const PREFERRED_ASPECT = 0.75
    
    let canvas: HTMLCanvasElement, rendered = false

    export let mouse: { x: number, y: number } | undefined

    let width: number, height: number
    let renderer: any, program: any, mesh: any, flowmap: any // no types for OGL :(
    onMount(() => {
        renderer = new Renderer({
            dpr: 1, // it's a gradient after all
            canvas
        })
        const { gl } = renderer

        flowmap = new Flowmap(gl, {
            falloff: 1.5, // size of the stamp, percentage of the size
            alpha: 0.3, // opacity of the stamp
            dissipation: 0.94 // affects the speed that the stamp fades. Closer to 1 is slower
        })

        // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
        const geometry = new Geometry(gl, {
            position: {
                size: 2,
                data: new Float32Array([-1, -1, 3, -1, -1, 3])
            },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
        });

        program = new Program(gl, {
            vertex,
            fragment: 'precision highp float;\nprecision highp int;\n'+patchShaders(fragment),
            uniforms: {
                u_time: { value: 0 },
                u_res: {
                    value: new Vec4(canvas.clientWidth, canvas.clientHeight, 1, 1)
                },
                // Note that the uniform is applied without using an object and value property
                // This is because the class alternates this texture between two render targets
                // and updates the value property after each render.
                u_flow: flowmap.uniform,
                u_mdf: { value: 0.1 }, // noise amount
                u_colorA: { value: new Color("#00012b") },
                u_colorStopA: { value: 0.1197 },
                u_colorB: { value: new Color("#042AC7") },
                u_colorStopB: { value: 0.2206 },
                u_colorC: { value: new Color("#0536D8") },
                u_colorStopC: { value: 0.2826 },
                u_colorD: { value: new Color("#1185FB") },
                u_colorStopD: { value: 0.42 },
                u_colorE: { value: new Color("#6FC2FF") },
                u_colorStopE: { value: 0.6895 },
                u_colorF: { value: new Color("#A5C4FF") },
                u_colorStopF: { value: 0.8 },
                u_colorG: { value: new Color("#C2BEFF") },
                u_colorStopG: { value: 0.9 }
            }
        })
        mesh = new Mesh(gl, { geometry, program })

        // Kick off render loop
        requestAnimationFrame((t) => {
            update(t)
            setTimeout(() => { rendered = true }, 200) // ugly, but prevent FOUC
        })
    })

    $: renderer?.setSize(width, height)
    $: aspect = width / height
    $: if (flowmap) flowmap.aspect = aspect
    $: if (mesh) {
        // Keep res uniform up-to-date
        let a1, a2;
        if (height / width < PREFERRED_ASPECT) {
            a1 = 1;
            a2 = height / width / PREFERRED_ASPECT
        } else {
            a1 = (width / height) * PREFERRED_ASPECT
            a2 = 1;
        }
        mesh.program.uniforms.u_res.value = new Vec4(
            width,
            height,
            a1,
            a2
        );
    }

    const nMouse = new Vec2(-1), velocity = new Vec2(), lastNMouse = new Vec2()
    let lastTime: number
    // Handle mouse move
    $: if (renderer?.gl && mouse) {
        // Get mouse value in 0 to 1 range, with y flipped
        nMouse.set(mouse.x / renderer.gl.renderer.width, 1.0 - mouse.y / renderer.gl.renderer.height)
        // Calculate velocity
        if (!lastTime) {
          // First frame
          lastTime = performance.now()
          lastNMouse.set(mouse.x, mouse.y)
        }

        const deltaX = mouse.x - lastNMouse.x;
        const deltaY = mouse.y - lastNMouse.y;

        lastNMouse.set(mouse.x, mouse.y);

        let time = performance.now();

        // Avoid dividing by 0
        let delta = Math.max(10.4, time - lastTime);
        lastTime = time;
        velocity.x = deltaX / delta;
        velocity.y = deltaY / delta;
        // Flag update to prevent hanging velocity values when not moving
        velocity.needsUpdate = true
    }

    function update(t: DOMHighResTimeStamp) {
        requestAnimationFrame(update)

        // Reset velocity when mouse not moving
        if (!velocity.needsUpdate) {
          nMouse.set(-1);
          velocity.set(0);
        }
        velocity.needsUpdate = false;
        // Update flowmap inputs
        flowmap.aspect = aspect;
        flowmap.mouse.copy(nMouse);
        // Ease velocity input, slower when fading out
        flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
        flowmap.update();
        
        program.uniforms.u_time.value = t * 0.001;
        renderer.render({ scene: mesh });
    }
</script>

<div class="absolute inset-0 opacity-0 transition duration-1000" class:opacity-100={rendered} bind:clientWidth={width} bind:clientHeight={height}>
    <canvas bind:this={canvas} />
    <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-full h-full top-0 left-0 mix-blend-soft-light">
        <defs>
            <filter id="hatch-f1" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
            </filter>
            <linearGradient id="hatch-g1">
                <stop offset="0" stop-color="white" />
                <stop offset="0.4" stop-color="white" />
                <stop offset="0.45" stop-color="black" />
            </linearGradient>
            <linearGradient id="hatch-g2" gradientTransform="rotate(-70 0.5 0.5)">
                <stop offset="0.35" stop-color="white" />
                <stop offset="1" stop-color="black" />
            </linearGradient>
            <linearGradient id="hatch-g3" gradientTransform="rotate(70 0.5 0.5)">
                <stop offset="0.35" stop-color="white" />
                <stop offset="1" stop-color="black" />
            </linearGradient>
            <mask id="hatch-m1" maskUnits="userSpaceOnUse" x="0%" y="0%" width="100%" height="100%" style:mask-type="luminance">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#hatch-g1)" />
            </mask>
            <mask id="hatch-m2" maskUnits="userSpaceOnUse" x="0%" y="0%" width="100%" height="100%" style:mask-type="luminance">
                <rect x="0" y="0" width="40%" height="100%" fill="white" />
                <rect x="40%" y="0" width="100%" height="50%" fill="url(#hatch-g2)" />
                <rect x="40%" y="50%" width="100%" height="50%" fill="url(#hatch-g3)" />
            </mask>
            <pattern id="hatch-p1" patternUnits="userSpaceOnUse" width="20.5" height="20.5" patternTransform="rotate(5)">
                <line x1="0" y="0" x2="0" y2="20.5" stroke="#ffffff" vector-effect="non-scaling-stroke" stroke-width="1" />
            </pattern>
            <pattern id="hatch-p2" patternUnits="userSpaceOnUse" width="20.5" height="20.5" patternTransform="rotate(-5)">
                <line x1="0" y="0" x2="0" y2="20.5" stroke="#ffffff" vector-effect="non-scaling-stroke" stroke-width="1" />
            </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hatch-p1)" filter="url(#hatch-f1)" mask="url(#hatch-m1)" />
        <rect width="100%" height="100%" fill="url(#hatch-p2)" filter="url(#hatch-f1)" mask="url(#hatch-m2)" />
    </svg>
</div>