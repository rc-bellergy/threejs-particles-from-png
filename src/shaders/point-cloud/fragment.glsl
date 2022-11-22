uniform float uFogNear;
uniform float uFogFar;
varying vec3 vColor;

void main()
{
    // Fog
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep( uFogNear, uFogFar, depth);

    // Disc
    float alpha = distance(gl_PointCoord, vec2(0.5));
    float radius = 0.4;

    // alpha = step(radius, alpha) + fogFactor;
    alpha = 1.0 - alpha;
    alpha = pow(alpha, 5.0) - fogFactor;
    gl_FragColor = vec4(vColor, alpha);

}