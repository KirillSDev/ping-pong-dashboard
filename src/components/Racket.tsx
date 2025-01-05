import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Clone, CloneProps } from "@react-three/drei";
import { GroupProps, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { FC, useEffect, useRef } from "react";
import { Group, Mesh, MeshStandardMaterial, Object3DEventMap } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils";

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

  return (
    <Clone
      object={model}
      scale={0.02}
      inject={<meshStandardMaterial color="black" />}
      position={position}
      rotation={rotation}
    />
  );
};
