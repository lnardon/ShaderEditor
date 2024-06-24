import { Editor } from "@monaco-editor/react";

const TextEditor = ({
  activeTab,
  setActiveTab,
  setFragment,
  setVertex,
  currentText,
  setCurrentText,
  vertex,
  fragment,
}: {
  activeTab: boolean;
  setActiveTab: (activeTab: boolean) => void;
  setFragment: (fragment: string) => void;
  setVertex: (vertex: string) => void;
  currentText: string;
  setCurrentText: (currentText: string | undefined) => void;
  vertex: string;
  fragment: string;
}) => {
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
          setCurrentText(e);
        }}
        value={currentText}
      />
    </>
  );
};

export default TextEditor;
