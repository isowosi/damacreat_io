#version 100

precision mediump float;

uniform sampler2D uBackground;
uniform vec2 uSize;
varying vec2 vHoleCenter;
varying float vHoleSize;

void main() {
    vec2 pointCoord = (gl_PointCoord - vec2(0.5, 0.5));
    float distToCenter = length(pointCoord);
    if (distToCenter > 0.5) {
        discard;
    } else if (distToCenter < 0.0625) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        vec2 blackHoleCenter = vHoleCenter * uSize;
        float stretchedLength = distToCenter / 2.0 + 0.25;
        pointCoord = pointCoord * stretchedLength / distToCenter;
        pointCoord *= vec2(vHoleSize, -vHoleSize);
        float blackHoleStrength = pow((0.5 - distToCenter) / 0.4, 2.0);
        float roatationAngle = blackHoleStrength * 3.14159 * 0.75;
        float sinAngle = sin(roatationAngle);
        float cosAngle = cos(roatationAngle);
        vec2 rotated = mat2(cosAngle, -sinAngle, sinAngle, cosAngle) * pointCoord;
        vec2 offsetCoord = (rotated + blackHoleCenter.xy)/uSize;

        vec4 texColor = texture2D(uBackground, offsetCoord);
        vec3 colorDiff = (vec3(1.2, 1.0, 1.0) - texColor.rgb) * blackHoleStrength * blackHoleStrength;
        gl_FragColor = vec4(texColor.rgb + colorDiff, 1.0);
    }
}