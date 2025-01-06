import { FC } from "react";
import { DoubleSide } from "three";

export const PlaneFloor: FC = () => {
  return (
    <mesh
      scale={100}
      rotation-x={Math.PI / 2}
      position={[0, -1.08, 0]}
      receiveShadow
    >
      <planeGeometry />
      <meshStandardMaterial attach="material" color="black" side={DoubleSide} />
    </mesh>
  );
};
