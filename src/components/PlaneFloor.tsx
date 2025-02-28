import { useFrame } from "@react-three/fiber";
import { FC } from "react";
import * as THREE from "three";
import { DoubleSide } from "three";

export const PlaneFloor: FC = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const center = new THREE.Vector3(0, 0, 0);

    const a = 10;
    const b = 6;

    const angle = t * 0.2;

    const x = Math.sin(t * 0.8) + 8;

    const z = Math.sin(t * 0.8 - 4) + 6;

    const y = Math.sin(angle * 2) + 4;

    state.camera.position.set(x, y, z);

    state.camera.lookAt(center);
  });
  return (
    <mesh
      scale={100}
      rotation-x={Math.PI / 2}
      position={[0, -1.08, 0]}
      receiveShadow
    >
      <planeGeometry />
      <meshStandardMaterial attach="material" color="red" side={DoubleSide} />
    </mesh>
  );
};
