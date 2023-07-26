import { MeshTransmissionMaterial, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useCallback } from "react";
import { Vector2, Color } from "three";
import { patchShaders } from 'gl-noise/build/glNoise.m'
import { vertexShader, fragmentShader } from './shaders'

const Gradient = () => {
    // This reference will give us direct access to the mesh
  const mesh = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });

  const updateMousePosition = useCallback((e) => {
    mousePosition.current = { x: e.pageX, y: e.pageY };
  }, []);
  
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_mouse: { value: new Vector2(0, 0) },
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
      u_colorStopF: { value: 0.8244 },
      u_colorG: { value: new Color("#C2BEFF") },
      u_colorStopG: { value: 0.9214 }
    }),
    []
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition, false);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition, false);
    };
  }, [updateMousePosition]);

  useFrame((state) => {
    const { clock } = state;

    mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    mesh.current.material.uniforms.u_mouse.value = new Vector2(
      mousePosition.current.x,
      mousePosition.current.y
    );
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} scale={1.5}>
      <planeGeometry args={[3, 2, 32, 32]} />
      <shaderMaterial
        fragmentShader={patchShaders(fragmentShader)}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};

export const App = () => {
  return (
    <Canvas camera={{ position: [0.0, 0.0, 1.5] }}>
      <OrbitControls />
      <Gradient />
    </Canvas>
  );
};
