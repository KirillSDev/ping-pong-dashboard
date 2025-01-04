import { Clone } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { FC, useEffect } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const OBJ = "racket.obj";

export const Racket: FC<{
  id: string;
  racketPosition: [number, number, number];
  racketRotation: [number, number, number];
}> = ({ id, racketPosition, racketRotation }) => {
  const model = useLoader(OBJLoader, OBJ);
  const { position, rotation } = useControls(id, {
    position: {
      value: racketPosition,
      step: 0.1,
    },
    rotation: {
      value: racketRotation,
      step: 0.1,
    },
  });
  useEffect(() => {
    model.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        const material = new MeshStandardMaterial({
          color: "black",
        });
        mesh.material = material;
        mesh.material.needsUpdate = true;
      }
    });
  }, [model, id]);

  return (
    <Clone
      object={model}
      scale={0.02}
      position={position}
      rotation={rotation}
    />
  );
};
