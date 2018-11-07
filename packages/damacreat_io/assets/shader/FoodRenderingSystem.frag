#version 100

precision mediump float;

uniform float uTime;
varying vec3 vColorMod;

void main() {
    float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
    if (dist > 0.5) {
      discard;
    }
    float alpha = 1.0 - dist * 0.8;
    alpha = alpha * alpha;
    float r = 0.4 + 0.4 * sin(uTime + vColorMod.r);
    float g = 0.8 + 0.2 * sin(uTime + vColorMod.g);
    float b = 0.4 + 0.4 * sin(uTime + vColorMod.b);
    gl_FragColor = vec4(r, g, b, alpha);
}
