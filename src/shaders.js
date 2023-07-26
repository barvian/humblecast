export const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}

`

export const fragmentShader = /* glsl */ `
varying vec2 vUv;

uniform float u_time;
uniform vec2 u_mouse;

uniform vec3 u_colorA;
uniform float u_colorStopA;
uniform vec3 u_colorB;
uniform float u_colorStopB;
uniform vec3 u_colorC;
uniform float u_colorStopC;
uniform vec3 u_colorD;
uniform float u_colorStopD;
uniform vec3 u_colorE;
uniform float u_colorStopE;
uniform vec3 u_colorF;
uniform float u_colorStopF;
uniform vec3 u_colorG;
uniform float u_colorStopG;


float lerp(float a, float b, float x) {
  return clamp((x - a) / (b - a), 0.0, 1.0);
}

vec3 rgb(int r, int g, int b) {
  return vec3(float(r)/255., float(g)/255., float(b)/255.);
}

void main() {
  vec2 p = vUv;

  p.x -= u_time * 0.1; /* pan to the right */
  p.y -= u_time * 0.1; /* pan up */

  // Docs: https://farazzshaikh.github.io/glNoise/module-Common.html
  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.5, 0.5, 1.5 /* scale */, 1.0 /* flatness */, 8 /* octaves */, false /* terbulance */, false);

  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.0, -1.0), 0.5, 2.0);
  gln_tGerstnerWaveOpts B = gln_tGerstnerWaveOpts(vec2(0.0, 1.0), 0.25, 4.0);
  gln_tGerstnerWaveOpts C = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.15, 6.0);
  gln_tGerstnerWaveOpts D = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.4, 2.0);

  float z = gln_normalize(gln_pfbm(p, fbmOpts));
  z += gln_GerstnerWave(vec3(p, z), A, u_time * 0.1).z;
  z += gln_GerstnerWave(vec3(p, z), D, u_time * 0.1).z * 0.2;

  float mdf = 0.05; // increase for noise amount 
  float grain = (fract(sin(dot(p, vec2(12.9898,78.233)*2.0)) * 43758.5453));

  vec3 color = mix(u_colorA, u_colorB, smoothstep(u_colorStopA, u_colorStopB, z));
  color = mix(color, u_colorC, smoothstep(u_colorStopB, u_colorStopC, z));  
  color = mix(color, u_colorD, smoothstep(u_colorStopC, u_colorStopD, z));  
  color = mix(color, u_colorE, smoothstep(u_colorStopD, u_colorStopE, z));  
  color = mix(color, u_colorF, smoothstep(u_colorStopE, u_colorStopF, z));  
  color = mix(color, u_colorG, smoothstep(u_colorStopF, u_colorStopG, z));  

  color -= grain * mdf;
  gl_FragColor = vec4(color, 1.0);
}

`