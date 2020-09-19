// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'assets.dart';

// **************************************************************************
// BundleGenerator
// **************************************************************************

const String _fShaderBackgroundRendering$content = r'''#version 100
precision highp float;

uniform float uTime;
uniform vec3 uRgb;
varying vec4 vPos;


//
// Description : Array and textureless GLSL 2D/3D/4D simplex
//               noise functions.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://www.shadertoy.com/view/ldXGR2

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v)
{
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 =   v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    // Permutations
    i = mod289(i);
    vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients: 7x7 points over a square, mapped onto an octahedron.
    // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
    float n_ = 0.142857142857;// 1.0/7.0
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);//  mod(p,7*7)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);// mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1),
    dot(p2, x2), dot(p3, x3)));
}

void main(){
    float total = 0.0;
    float frequency = 0.001;
    float lacunarity = 2.0;
    float gain = 1.0 / lacunarity;
    float amplitude = gain;
    float counter = 0.0;

    for (int i = 0; i < 6; i++) {
        total += snoise(vec3(vPos.xy * frequency, uTime / (40.0 - counter))) * amplitude;
        frequency *= lacunarity;
        amplitude *= gain;
        counter = counter + 4.0;
    }

    float r = total * 0.75 + sin(uTime / 13.0) * 0.15 + cos((vPos.x + uTime / 23.0) / 101.0) * 0.1;
    float g = total * 0.75 + sin(uTime / 17.0) * 0.15 + cos((vPos.y + uTime / 27.0) / 103.0) * 0.1;
    float b = total * 0.75 + sin(uTime / 19.0) * 0.15;

    gl_FragColor = vec4(uRgb * 0.0 + vec3(r, g, b), 1.0);
}''';

const String _vShaderBackgroundRendering$content = r'''#version 100
uniform mat4 uViewProjection;

attribute vec4 aPosition;
varying vec4 vPos;

void main() {
	gl_Position = uViewProjection * aPosition;
	vPos = aPosition;
}
''';

const String _fShaderBlackHoleRendering$content = r'''#version 100

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
}''';

const String _vShaderBlackHoleRendering$content = r'''#version 100

uniform mat4 uViewProjection;
attribute vec2 aPosition;
attribute float aSize;
varying vec2 vHoleCenter;
varying float vHoleSize;

void main() {
    vec4 position = uViewProjection * vec4(aPosition, 0.0, 1.0);
    gl_Position = position;
    gl_PointSize = aSize;
    vHoleCenter = (vec2(1.0, 1.0) + position.xy) / 2.0;
    vHoleSize = aSize;
}''';

const String _fShaderPositionRendering$content = r'''#version 100

precision mediump float;
varying vec4 color;

void main() {
	gl_FragColor = color;
}''';

const String _vShaderPositionRendering$content = r'''#version 100

uniform mat4 uViewProjection;
attribute vec2 aPosition;
attribute vec4 aColor;
varying vec4 color;

void main() {
    gl_Position = uViewProjection * vec4(aPosition, 0.0, 1.0);
    color = aColor;
}''';

const String _fShaderSpriteRendering$content = r'''#version 100

precision mediump float;

uniform sampler2D uSheet;
uniform vec2 uSize;
varying vec2 vTexCoord;
varying vec4 vColor;

void main() {
	vec4 texColor = texture2D(uSheet, vTexCoord / uSize);
	gl_FragColor = vec4(vColor * texColor);
}''';

const String _vShaderSpriteRendering$content = r'''#version 100

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
}''';

const String _fShaderWhiteHoleRendering$content = r'''#version 100

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
}''';
