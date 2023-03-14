export const shaders = {
  vertex: `uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`,
  fragment: `precision mediump float;

void main()
{
    gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
`,
};
