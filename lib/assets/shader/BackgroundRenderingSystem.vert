#version 100
uniform mat4 uViewProjection;

attribute vec4 aPosition;
varying vec4 vPos;

void main() {
	gl_Position = uViewProjection * aPosition;
	vPos = aPosition;
}
