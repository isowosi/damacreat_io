#version 100

precision mediump float;

uniform sampler2D uBackground;
uniform vec2 uSize;
varying vec2 vBlackHoleCenter;
varying float vBlackHoleSize;

void main() {
    vec2 pointCoord = (gl_PointCoord - vec2(0.5, 0.5));
    float distToCenter = length(pointCoord);
    if (distToCenter > 0.5) {
        discard;
    } else if (distToCenter < 0.1) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        pointCoord = pointCoord / 4.0 + vec2(0.375, 0.375);
        pointCoord *= vec2(vBlackHoleSize, -vBlackHoleSize * uSize.y / uSize.x);
        float blackHoleStrength = (0.45 - distToCenter) / 0.4;
        blackHoleStrength *= blackHoleStrength;
        float roatationAngle = blackHoleStrength * 3.14159 * 2.0;
        vec2 rotated = mat2(cos(roatationAngle), -sin(roatationAngle), sin(roatationAngle), cos(roatationAngle)) * pointCoord * blackHoleStrength;
        vec2 offsetCoord = (rotated + gl_FragCoord.xy)/uSize;

        vec4 texColor = texture2D(uBackground, offsetCoord);
        texColor = texColor * texColor.a;
        vec3 colorDiff = (vec3(1.2, 1.0, 1.0) - texColor.rgb) * blackHoleStrength * blackHoleStrength;
        gl_FragColor = vec4(texColor.rgb + colorDiff, 1.0);
    }
}