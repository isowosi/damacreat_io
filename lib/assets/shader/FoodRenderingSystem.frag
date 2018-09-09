#version 100

precision mediump float;

uniform float uTime;
varying vec3 vColorMod;
varying vec2 vCenter;
varying float vRadius;

void main() {
    float alpha = 1.0 - distance(gl_PointCoord, vec2(0.5, 0.5));
    alpha = alpha * alpha;
    float r = 0.6 + 0.6 * sin(uTime + vColorMod.r);
    float g = 0.8 + 0.2 * sin(uTime + vColorMod.g);
    float b = 0.6 + 0.6 * sin(uTime + vColorMod.b);
    gl_FragColor = vec4(r, g, b, alpha);
}
