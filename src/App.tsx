import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import Editor, { useMonaco } from "@monaco-editor/react";
import { shaders } from "./utils/shaders";
import { glslDefinition } from "./utils/glsl-language-definition";

import "./App.css";
import ShaderMesh from "./components/ShaderMesh/ShaderMesh";

function App() {
  const monaco = useMonaco();
  const [activeTab, setActiveTab] = useState(true);
  const [vertex, setVertex] = useState<any>(shaders.vertex);
  const [fragment, setFragment] = useState<any>(shaders.fragment);
  const [currentText, setCurrentText] = useState<any>(shaders.vertex);
  const [showShader, setShowShader] = useState(true);

  function handleShaderRender() {
    setShowShader(false);
    if (activeTab) {
      setVertex(currentText);
    } else {
      setFragment(currentText);
    }
    setTimeout(() => {
      setShowShader(true);
    }, 10);
  }

  function addGLSL(monaco: any) {
    monaco.languages.register({ id: "glsl" });
    monaco.languages.setMonarchTokensProvider("glsl", glslDefinition);
    // monaco.editor.defineTheme("custom-dark", customTheme);
  }

  useEffect(() => {
    if (monaco) {
      addGLSL(monaco);
    }
  }, [monaco]);

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
            <button
              className={`tab-btn ${activeTab ? "active-tab" : ""}`}
              onClick={() => {
                setFragment(currentText);
                setActiveTab(true);
                setCurrentText(vertex);
              }}
            >
              Vertex Shader
            </button>
            <button
              className={`tab-btn ${!activeTab ? "active-tab" : ""}`}
              onClick={() => {
                setVertex(currentText);
                setActiveTab(false);
                setCurrentText(fragment);
              }}
            >
              Fragment Shader
            </button>
          </div>
          <Editor
            className=" overflow-hidden"
            theme="vs-dark"
            language="glsl"
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
            onChange={(e) => {
              setCurrentText(e);
            }}
            value={currentText}
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
            speed={2} // Speed factor
            zoom={1} // Zoom factor when half the polar-max is reached
            rotation={[0, 0, 0]} // Default rotation
            polar={[-Infinity, Infinity]} // Vertical limits
            azimuth={[-Infinity, Infinity]} // Horizontal limits
            config={{ mass: 0.0001, tension: 0.001, friction: 0.0005 }} // Spring config
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
