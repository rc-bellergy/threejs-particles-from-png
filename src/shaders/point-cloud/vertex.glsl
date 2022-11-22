uniform float uTime;
uniform float uSize;
uniform float uFogNear;
uniform float uFogFar;

attribute float aScale;
attribute float aDuration;
attribute float aJump;
attribute vec3 aStartPosition;

varying vec3 vColor;

#define PI 3.1415926538

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main()
{
    /**
    * Position
    */

    // Use `easeOutQuint` move particle from start position to end position
    // https://www.desmos.com/calculator/zmcin6ak84
    // https://easings.net/#easeOutQuint
    vec3 p;     // position
    float y;    // mixer
    float power = 5.0;
    if (uTime <= aDuration) {
        y = 1.0 - pow(1.0 - uTime/aDuration, power);
        p = aStartPosition * (1.0 - y) + position * y;
    } else {
        y = -aJump * cos(2.0 * PI * uTime / (aDuration * 5.0));
        p = aStartPosition * y + position * (1.0 - y);
    }

    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    /**
    * Size
    */
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    /**
    * Color
    */
    // Pass color to fragment
    vColor = color;
}
