import { useState } from "react";
import { shaders } from "./utils/shaders";
import "./App.css";
import Header from "./components/Header";
import TextEditor from "./components/TextEditor";
import RenderView from "./components/RenderView";

function App() {
  const [vertex, setVertex] = useState<any>(shaders.vertex);
  const [fragment, setFragment] = useState<any>(shaders.fragment);
  const [showShader, setShowShader] = useState(true);
  const [wireframe, setWireframe] = useState(true);
  const [geometrySize, setGeometrySize] = useState(32);
  const [numberOfSegments, setNumberOfSegments] = useState(4);

  function handleShaderRender() {
    setShowShader(false);
    setTimeout(() => {
      setShowShader(true);
    }, 200);
  }

  return (
    <div className="App">
      <Header />

      <div className="content">
        <div className="left-side">
          <TextEditor
            setFragment={setFragment}
            setVertex={setVertex}
            vertex={vertex}
            fragment={fragment}
            setShowShader={setShowShader}
            getCurrentText={() => vertex}
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
                onChange={(e) =>
                  e.target.value === "true"
                    ? setWireframe(true)
                    : setWireframe(false)
                }
                defaultValue={wireframe ? "true" : "false"}
              >
                <option value="false">Material</option>
                <option value="true">Wireframe</option>
              </select>
              <select
                className="settingsSelect"
                onChange={(e) => setNumberOfSegments(Number(e.target.value))}
                defaultValue={numberOfSegments}
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
                defaultValue={geometrySize}
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
          <RenderView
            showShader={showShader}
            wireframe={wireframe}
            vertex={vertex}
            fragment={fragment}
            numberOfSegments={numberOfSegments}
            geometrySize={geometrySize}
            handleShaderRender={handleShaderRender}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
