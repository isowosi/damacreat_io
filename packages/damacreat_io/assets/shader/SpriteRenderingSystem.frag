#version 100

precision mediump float;

uniform sampler2D uSheet;
uniform vec2 uSize;
varying vec2 vTexCoord;
varying vec4 vColor;

void main() {
	vec4 texColor = texture2D(uSheet, vTexCoord / uSize);
	gl_FragColor = vec4(vColor * texColor);
}