import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
  const [geometry, setGeometry] = useState("plane");

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
        <div className="logo-container">
          <img className="logo" src="./icon.png" alt="Logo" />
          <h1 className="title">GLSL Shader Editor</h1>
        </div>
        <div
          className="github-btn"
          onClick={() =>
            window.open("https://github.com/lnardon/ShaderEditor", "_blank")
          }
        >
          <img className="github-logo" src="./logo.png" alt="Github Logo" />
          View on Github
        </div>
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
        <div className="right-side">
          <div className="renderActionsContainer">
            <button
              className="run-btn"
              onClick={() => {
                handleShaderRender();
              }}
            >
              <img className="play-icon" src="./play.png" alt="Play" />
              Run
            </button>
            <select
              name=""
              id=""
              className="geometrySelect"
              onChange={(e) => setGeometry(e.target.value)}
            >
              <option value="plane">Plane Geometry</option>
              <option value="box">Box Geometry</option>
              <option value="sphere">Sphere Geometry</option>
            </select>
          </div>
          <Canvas camera={{ position: [0, 0, 128] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            {showShader ? (
              <ShaderMesh
                vertex={vertex}
                fragment={fragment}
                geometry={geometry}
              />
            ) : null}
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
