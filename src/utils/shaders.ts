export const shaders = {
  vertex: `uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;

attribute vec3 position;

void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 0.350);
}
`,
  fragment: `precision mediump float;
uniform float uTime;


void main()
{
    gl_FragColor = vec4(sin(uTime)/1.30, cos(uTime)/1.20, tan(uTime)/1.20, 1.0);
}
`,
};
