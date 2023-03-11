import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Editor from "@monaco-editor/react";
import { shaders } from "./shaders";

import "./App.css";
import ShaderMesh from "./components/ShaderMesh/ShaderMesh";

function App() {
  const ref = useRef<any>(null);
  const [vertex, setVertex] = useState<any>(shaders.vertex);
  const [fragment, setFragment] = useState<any>(shaders.fragment);
  const [showShader, setShowShader] = useState(true);

  function handleShaderRender() {
    setShowShader(false);
    setTimeout(() => {
      setShowShader(true);
    }, 1000);
  }

  return (
    <div className="App">
      <header className="header-container">
        <h1>GLSL Shader Editor</h1>
        <button onClick={handleShaderRender} className="apply-btn">
          Apply Shader
        </button>
      </header>
      <div className="content">
        <div className="left-side">
          <div className="shader-tabs">
            <button>Vertex Shader</button>
            <button>Fragment Shader</button>
          </div>
          <Editor
            className=" overflow-hidden"
            theme="vs-dark"
            options={{
              scrollbar: {
                vertical: "hidden",
                horizontal: "hidden",
                handleMouseWheel: false,
              },
              hideCursorInOverviewRuler: true,
              minimap: { enabled: false },
            }}
            height="80vh"
            defaultLanguage="glsl"
            defaultValue={fragment}
            onChange={(e) => {
              setFragment(e);
            }}
          />
        </div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <PresentationControls
            enabled={true} // the controls can be disabled by setting this to false
            global={true} // Spin globally or by dragging the model
            cursor={true} // Whether to toggle cursor style on drag
            snap={false} // Snap-back to center (can also be a spring config)
            speed={1} // Speed factor
            zoom={1} // Zoom factor when half the polar-max is reached
            rotation={[0, 0, 0]} // Default rotation
            polar={[0, Math.PI / 2]} // Vertical limits
            azimuth={[-Infinity, Infinity]} // Horizontal limits
            config={{ mass: 0.3, tension: 10, friction: 5 }} // Spring config
          >
            {showShader ? (
              <ShaderMesh vertex={vertex} fragment={fragment} />
            ) : null}
          </PresentationControls>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
