#version 100

uniform mat4 uViewProjection;
attribute vec2 aPosition;
attribute float aSize;
varying vec2 vBlackHoleCenter;
varying float vBlackHoleSize;

void main() {
    gl_Position = uViewProjection * vec4(aPosition, 0.0, 1.0);
    gl_PointSize = aSize * 8.0;
    vBlackHoleCenter = (uViewProjection * vec4(aPosition, 0.0, 1.0)).xy;
    vBlackHoleSize = aSize * 8.0;
}