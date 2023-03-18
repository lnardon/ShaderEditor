export const shaders = {
  vertex: `precision mediump float;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uTime;   // This uniform is provided by the editor to the shaders every frame using the time provided by Three.js Clock
uniform float uRandom; // This uniform is provided by the editor to the shaders every frame using the javascript Math.random() function

attribute vec3 position;

void main()
{
  mat4 projectViewModel = projectionMatrix * viewMatrix * modelMatrix;
  gl_Position = projectViewModel * vec4(position.x,position.y,sin(position.x + ( 2.5 * uTime)), 0.350);
}
`,
  fragment: `precision mediump float;
uniform float uTime;   // This uniform is provided by the editor to the shaders every frame using the time provided by Three.js Clock
uniform float uRandom; // This uniform is provided by the editor to the shaders every frame using the javascript Math.random() function

void main()
{
    gl_FragColor = vec4(cos(uTime + (uRandom * 0.25)), cos(uTime), sin(uTime), 1.0);
}
`,
};
