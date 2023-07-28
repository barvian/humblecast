varying vec2 vUv;

uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mdf;

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

vec3 displace(vec2 p) {
  // Docs: https://farazzshaikh.github.io/glNoise/module-Common.html
  gln_tFBMOpts fbmOpts = gln_tFBMOpts(1.0, 0.5, 0.5, 2.0 /* scale */, 1.0 /* flatness */, 8 /* octaves */, false /* terbulance */, false);

  // TODO: thematically it seems like these should be sine waves cause it's audio-related, but I like the look of this more
  gln_tGerstnerWaveOpts A = gln_tGerstnerWaveOpts(vec2(0.0, -1.0), 0.5, 2.0);
  // gln_tGerstnerWaveOpts B = gln_tGerstnerWaveOpts(vec2(0.0, 1.0), 0.25, 4.0);
  // gln_tGerstnerWaveOpts C = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.15, 6.0);
  gln_tGerstnerWaveOpts D = gln_tGerstnerWaveOpts(vec2(1.0, 1.0), 0.4, 2.0);

  float z = gln_normalize(gln_pfbm(p, fbmOpts));
  z += gln_GerstnerWave(vec3(p, z), A, u_time * 0.1).z;
  z += gln_GerstnerWave(vec3(p, z), D, u_time * 0.1).z * 0.2;

  vec3 color = mix(u_colorA, u_colorB, smoothstep(u_colorStopA, u_colorStopB, z));
  color = mix(color, u_colorC, smoothstep(u_colorStopB, u_colorStopC, z));  
  color = mix(color, u_colorD, smoothstep(u_colorStopC, u_colorStopD, z));  
  color = mix(color, u_colorE, smoothstep(u_colorStopD, u_colorStopE, z));  
  color = mix(color, u_colorF, smoothstep(u_colorStopE, u_colorStopF, z));  
  color = mix(color, u_colorG, smoothstep(u_colorStopF, u_colorStopG, z));

  return color;
}

void main() {
  vec2 p = vUv;
  p.x -= u_time * 0.1; /* pan to the right */
  p.y -= u_time * 0.1; /* pan up */

  vec3 color = displace(p);
  
  // Add grain
  float grain = (fract(sin(dot(p, vec2(12.9898,78.233)*2.0)) * 43758.5453));
  color -= grain * u_mdf;

  gl_FragColor = vec4(color, 1.0);
}