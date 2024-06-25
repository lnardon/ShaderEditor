import { useEffect, memo } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ShaderMesh from "../ShaderMesh/ShaderMesh";

const RenderView = ({
  showShader,
  wireframe,
  vertex,
  fragment,
  numberOfSegments,
  geometrySize,
  handleShaderRender,
}: {
  showShader: boolean;
  wireframe: boolean;
  vertex: string;
  fragment: string;
  numberOfSegments: number;
  geometrySize: number;
  handleShaderRender: () => void;
}) => {
  useEffect(() => {
    handleShaderRender();
  }, []);

  return (
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
          geometry={"plane"}
          numberOfSegments={numberOfSegments}
          geometrySize={geometrySize}
        />
      ) : null}
    </Canvas>
  );
};

export default memo(RenderView);
