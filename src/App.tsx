import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import "./App.css";

function App() {
  const ref = useRef<any>(null);
  const [vertex, setVertex] = useState(`        uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;

        attribute vec3 position;

        void main()
        {
            gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
        }`);
  const [fragment, setFragment] = useState(`      precision mediump float;

        void main()
        {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }`);

  return (
    <div className="App">
      <h1>Shader Editor</h1>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh ref={ref}>
          <boxGeometry args={[1, 1, 1]} />
          <rawShaderMaterial vertexShader={vertex} fragmentShader={fragment} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
