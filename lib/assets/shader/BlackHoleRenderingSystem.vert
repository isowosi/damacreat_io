#version 100

uniform mat4 uViewProjection;
attribute vec2 aPosition;
attribute float aSize;
varying vec2 vBlackHoleCenter;
varying float vBlackHoleSize;

void main() {
    vec4 position = uViewProjection * vec4(aPosition, 0.0, 1.0);
    gl_Position = position;
    gl_PointSize = aSize;
    vBlackHoleCenter = (vec2(1.0, 1.0) + position.xy) / 2.0;
    vBlackHoleSize = aSize;
}