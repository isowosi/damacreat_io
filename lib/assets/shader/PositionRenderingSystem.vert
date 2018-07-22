#version 300 es

uniform mat4 viewProjectionMatrix;
in vec2 pos;

void main() {
	gl_Position = viewProjectionMatrix * vec4(pos, 0.0, 1.0);
}