<script lang="ts">
    import { onMount } from "svelte"
    import { Renderer, Vec2, Vec4, Color, Flowmap, Geometry, Mesh, Program } from 'ogl'
    import fragment from './fragment.glsl?raw'
    import vertex from './vertex.glsl?raw'
    import { patchShaders } from 'gl-noise/build/glNoise.m'

    const PREFERRED_ASPECT = 1
    
    let canvas: HTMLCanvasElement

    let width: number, height: number
    let renderer: any, program: any, mesh: any, flowmap: any // no types for OGL :(
    onMount(() => {
        renderer = new Renderer({
            dpr: 2,
            canvas
        })
        const { gl } = renderer

        flowmap = new Flowmap(gl, {
            falloff: 1.0, // size of the stamp, percentage of the size
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
                u_colorStopB: { value: 0.2606 },
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
        requestAnimationFrame(update);
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

    const mouse = new Vec2(-1), velocity = new Vec2(), lastMouse = new Vec2()
    let lastTime: number
    function handleMouseMove(e: MouseEvent) {
        e.preventDefault();
        const { gl } = renderer
        if (!gl) return

        // Get mouse value in 0 to 1 range, with y flipped
        mouse.set(e.x / gl.renderer.width, 1.0 - e.y / gl.renderer.height)
        // Calculate velocity
        if (!lastTime) {
          // First frame
          lastTime = performance.now()
          lastMouse.set(e.x, e.y)
        }

        const deltaX = e.x - lastMouse.x;
        const deltaY = e.y - lastMouse.y;

        lastMouse.set(e.x, e.y);

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
          mouse.set(-1);
          velocity.set(0);
        }
        velocity.needsUpdate = false;
        // Update flowmap inputs
        flowmap.aspect = aspect;
        flowmap.mouse.copy(mouse);
        // Ease velocity input, slower when fading out
        flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
        flowmap.update();
        
        program.uniforms.u_time.value = t * 0.001;
        renderer.render({ scene: mesh });
    }
</script>

<div class="absolute inset-0" bind:clientWidth={width} bind:clientHeight={height} role="presentation" on:mousemove={handleMouseMove}>
    <canvas bind:this={canvas} />
</div>