import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { FC, useEffect } from "react";
import { DoubleSide, Material, Mesh } from "three";

const MTL_FILE = "table_tennis.mtl";
const OBJ = "table_tennis.obj";

export const PingPongTable: FC = () => {
  const mtl = useLoader(MTLLoader, MTL_FILE);
  const model = useLoader(OBJLoader, OBJ, (loader) => {
    loader.setMaterials(mtl);
  });
  useEffect(() => {
    model.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [model]);

  return (
    <mesh scale={0.02} castShadow receiveShadow>
      <primitive object={model} />
    </mesh>
  );
};
