import React from "react";

const ShaderMesh: React.FC<{ vertex: string; fragment: string }> = ({
  vertex,
  fragment,
}) => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <rawShaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        needsUpdate={true}
      />
    </mesh>
  );
};

export default ShaderMesh;
