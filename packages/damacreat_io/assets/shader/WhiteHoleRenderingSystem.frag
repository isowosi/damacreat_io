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
    } else if (distToCenter < 0.05) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else {
        vec2 whiteHoleCenter = vHoleCenter * uSize;
        float stretchedLength = distToCenter / 0.9 - 0.0625;
        pointCoord = pointCoord * stretchedLength / distToCenter;
        pointCoord *= vec2(vHoleSize, -vHoleSize);
        float whiteHoleStrength = pow((0.5 - distToCenter) / 0.4, 2.0);
        vec2 offsetCoord = (pointCoord + whiteHoleCenter.xy) / uSize;

        vec4 texColor = texture2D(uBackground, offsetCoord);
        vec3 colorDiff = (vec3(1.2, 1.0, 1.0) - texColor.rgb) * whiteHoleStrength * whiteHoleStrength;
        gl_FragColor = vec4(texColor.rgb + colorDiff, 1.0);
    }
}