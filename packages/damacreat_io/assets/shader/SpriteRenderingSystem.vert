#version 100

uniform mat4 uViewProjection;
attribute vec4 aPosition;
attribute vec2 aTexCoord;
attribute vec4 aColor;
varying vec2 vTexCoord;
varying vec4 vColor;

void main() {
  gl_Position = uViewProjection * aPosition;
  vTexCoord = aTexCoord;
  vColor = aColor;
}