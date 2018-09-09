#version 100

uniform mat4 uViewProjection;
attribute vec3 aColorMod;
attribute vec2 aPosition;
attribute float aRadius;
varying vec3 vColorMod;
varying vec2 vCenter;
varying float vRadius;

void main() {
    gl_Position = uViewProjection * vec4(aPosition, 0.0, 1.0);
    gl_PointSize = aRadius * 2.0;
    vCenter = aPosition;
    vRadius = aRadius;
    vColorMod = aColorMod;
}
