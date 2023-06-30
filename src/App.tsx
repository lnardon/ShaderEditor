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
  const [wireframe, setWireframe] = useState(false);
  const [geometrySize, setGeometrySize] = useState(32);
  const [numberOfSegments, setNumberOfSegments] = useState(4);

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
                if (!activeTab) {
                  setFragment(currentText);
                  setActiveTab(true);
                  setCurrentText(vertex);
                }
              }}
            >
              Vertex Shader
            </button>
            <button
              className={`tab-btn ${!activeTab ? "active-tab" : ""}`}
              onClick={() => {
                if (activeTab) {
                  setVertex(currentText);
                  setActiveTab(false);
                  setCurrentText(fragment);
                }
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
            <div>
              <select
                className="settingsSelect"
                onChange={(e) => setGeometry(e.target.value)}
              >
                <option value="plane">Plane Geometry</option>
                <option value="box">Box Geometry</option>
                <option value="sphere">Sphere Geometry</option>
              </select>
              <select
                className="settingsSelect"
                onChange={(e) =>
                  e.target.value === "true"
                    ? setWireframe(true)
                    : setWireframe(false)
                }
              >
                <option value="false">Material</option>
                <option value="true">Wireframe</option>
              </select>
              <select
                className="settingsSelect"
                onChange={(e) => setNumberOfSegments(Number(e.target.value))}
              >
                <option value="1">1 Segments</option>
                <option value="2">2 Segments</option>
                <option value="4">4 Segments</option>
                <option value="8">8 Segments</option>
                <option value="16">16 Segments</option>
                <option value="32">32 Segments</option>
                <option value="64">64 Segments</option>
                <option value="128">128 Segments</option>
                <option value="256">256 Segments</option>
                <option value="512">512 Segments</option>
                <option value="1024">1024 Segments</option>
              </select>
              <select
                className="settingsSelect"
                onChange={(e) => setGeometrySize(Number(e.target.value))}
              >
                <option value="1">Size: 1</option>
                <option value="2">Size: 2</option>
                <option value="4">Size: 4</option>
                <option value="8">Size: 8</option>
                <option value="16">Size: 16</option>
                <option value="32">Size: 32</option>
                <option value="64">Size: 64</option>
                <option value="128">Size: 128</option>
                <option value="256">Size: 256</option>
                <option value="512">Size: 512</option>
                <option value="1024">Size: 1024</option>
              </select>
            </div>
          </div>
          <Canvas
            camera={{ position: [0, 0, 128] }}
            style={{ width: "calc(100% - 32px)", borderRadius: "8px" }}
          >
            <OrbitControls />
            {showShader ? (
              <ShaderMesh
                wireframe={wireframe}
                vertex={vertex}
                fragment={fragment}
                geometry={geometry}
                numberOfSegments={numberOfSegments}
                geometrySize={geometrySize}
              />
            ) : null}
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
