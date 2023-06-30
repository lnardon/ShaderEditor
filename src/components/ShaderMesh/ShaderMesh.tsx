import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ShaderMesh: React.FC<{
  vertex: string;
  fragment: string;
  geometry: string;
  wireframe: boolean;
}> = ({ vertex, fragment, geometry, wireframe }) => {
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
        return <planeGeometry args={[64, 64, 128, 128]} />;
    }
  }

  return (
    <mesh ref={ref} rotation={[Math.PI / 1.5, 0, 0]}>
      <>
        {getGeometry()}
        <rawShaderMaterial
          attach="material"
          side={THREE.DoubleSide}
          vertexShader={vertex}
          fragmentShader={fragment}
          needsUpdate={true}
          wireframe={wireframe}
          uniforms={{ uTime: { value: 0.5 }, uRandom: { value: 0.0 } }}
        />
      </>
    </mesh>
  );
};

export default ShaderMesh;
