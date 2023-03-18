import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const ShaderMesh: React.FC<{
  vertex: string;
  fragment: string;
  geometry: string;
}> = ({ vertex, fragment, geometry }) => {
  const ref = useRef<any>();
  useFrame((state) => {
    let time = state.clock.getElapsedTime();
    ref.current.material.uniforms.uTime.value = time;
    ref.current.material.uniforms.uRandom.value = Math.random();
  });

  function getGeometry() {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[8, 8, 8, 8]} />;
      case "sphere":
        return <sphereGeometry args={[8, 16, 32]} />;
      default:
        return <planeGeometry args={[32, 32, 32, 32]} />;
    }
  }

  return (
    <mesh ref={ref}>
      <>
        {getGeometry()}
        <rawShaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          needsUpdate={true}
          wireframe
          uniforms={{ uTime: { value: 0.5 }, uRandom: { value: 0.0 } }}
        />
      </>
    </mesh>
  );
};

export default ShaderMesh;
