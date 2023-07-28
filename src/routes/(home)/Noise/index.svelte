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

        // Variable inputs to control flowmap
        const mouse = new Vec2(-1);
        const velocity = new Vec2();

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
                // res: {
                //     value: new Vec4(width, height, 1, 1)
                // },
                // img: { value: new Vec2(imgSize[0], imgSize[1]) },
                // Note that the uniform is applied without using an object and value property
                // This is because the class alternates this texture between two render targets
                // and updates the value property after each render.
                // tFlow: flowmap.uniform
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

    function update(t: DOMHighResTimeStamp) {
        requestAnimationFrame(update);
        program.uniforms.u_time.value = t * 0.001;
        renderer.render({ scene: mesh });
    }

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
        mesh.program.uniforms.res.value = new Vec4(
            width,
            height,
            a1,
            a2
        );
    }
</script>

<div class="absolute inset-0" bind:clientWidth={width} bind:clientHeight={height}>
    <canvas bind:this={canvas} />
</div>