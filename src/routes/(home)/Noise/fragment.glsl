varying vec2 vUv;

uniform float u_time;
uniform vec2 u_mouse;
uniform float u_mdf;
uniform sampler2D u_flow;
uniform vec4 u_res;

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

vec3 displace(vec2 _p) {
  vec2 p = vec2(_p.x/u_res.z, _p.y/u_res.w); // scale by preferred aspect ratio

  // Docs: https://farazzshaikh.github.io/glNoise/module-Common.html
  float z = gln_normalize(gln_perlin(p));

  // Sinuoidal distortion (fitting for sound waves?)
  z += sin(p.x * 3. + u_time * 0.5) * 0.1;
  z += sin(p.y * 2. + u_time * 0.5 + 0.5) * 0.1;

  // Gradient
  vec3 color = mix(u_colorA, u_colorB, smoothstep(u_colorStopA, u_colorStopB, z));
  color = mix(color, u_colorC, smoothstep(u_colorStopB, u_colorStopC, z));  
  color = mix(color, u_colorD, smoothstep(u_colorStopC, u_colorStopD, z));  
  color = mix(color, u_colorE, smoothstep(u_colorStopD, u_colorStopE, z));  
  color = mix(color, u_colorF, smoothstep(u_colorStopE, u_colorStopF, z));  
  color = mix(color, u_colorG, smoothstep(u_colorStopF, u_colorStopG, z));

  return color;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  uv.x -= u_time * 0.1; /* pan to the right */
  uv.y += u_time * 0.1; /* and down */

  // Work in mouse displacement
  // Copied from https://tympanus.net/Development/FlowmapDeformation/index2.html
  // R and G values are velocity in the x and y direction
  // B value is the velocity length
  vec3 flow = texture2D(u_flow, vUv).rgb;
  vec2 myUV = (uv - vec2(0.5))*u_res.zw + vec2(0.5);
  myUV -= flow.xy * (0.15 * 0.7);
  vec2 myUV2 = (uv - vec2(0.5))*u_res.zw + vec2(0.5);
  myUV2 -= flow.xy * (0.125 * 0.7);
  vec2 myUV3 = (uv - vec2(0.5))*u_res.zw + vec2(0.5);
  myUV3 -= flow.xy * (0.10 * 0.7);

  vec3 pix = displace(myUV).rgb;
  vec3 pix2 = displace(myUV2).rgb;
  vec3 pix3 = displace(myUV3).rgb;

  vec3 color = vec3(pix.r, pix2.g, pix3.b);
  // color = displace(uv);
  
  // Add grain
  // https://www.shadertoy.com/view/3sGGRz
  float grain = (fract(sin(dot(uv, vec2(12.9898,78.233)*2.0)) * 43758.5453));
  color -= grain * u_mdf;

  gl_FragColor = vec4(color, 1.0);
}