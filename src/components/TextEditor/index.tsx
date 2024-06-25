import { useEffect } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";
import { glslDefinition } from "../../utils/glsl-language-definition";
import { useTextStore } from "../../utils/store";

const TextEditor = ({
  setFragment,
  setVertex,
  vertex,
  fragment,
}: {
  setFragment: (fragment: string) => void;
  setVertex: (vertex: string) => void;
  vertex: string;
  fragment: string;
}) => {
  const monaco = useMonaco();
  const { currentText, activeTab, setCurrentText, setActiveTab } =
    useTextStore();

  function addGLSL(monaco: any) {
    monaco.languages.register({ id: "glsl" });
    monaco.languages.setMonarchTokensProvider("glsl", glslDefinition);
  }

  useEffect(() => {
    if (monaco) {
      addGLSL(monaco);
    }
  }, [monaco]);

  return (
    <>
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
          setCurrentText(e!);
        }}
        value={currentText}
      />
    </>
  );
};

export default TextEditor;
