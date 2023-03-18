export const shaders = {
  vertex: `uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;
uniform float uRandom;
attribute vec3 position;

void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 0.350);
}
`,
  fragment: `precision mediump float;
uniform float uTime;
uniform float uRandom;

void main()
{
    gl_FragColor = vec4(sin(uTime + (uRandom / 7.0))/1.30, cos(uTime)/1.20, tan(uRandom / 5.0)/1.20, 1.0);
}
`,
};
