import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const ShaderMesh: React.FC<{ vertex: string; fragment: string }> = ({
  vertex,
  fragment,
}) => {
  const ref = useRef<any>();
  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    ref.current.material.uniforms.uTime.value = time;
    ref.current.material.uniforms.uRandom.value = Math.random();
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 10, 10]} />
      <rawShaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        needsUpdate={true}
        wireframe
        uniforms={{ uTime: { value: 0.5 }, uRandom: { value: 0.0 } }}
      />
    </mesh>
  );
};

export default ShaderMesh;
