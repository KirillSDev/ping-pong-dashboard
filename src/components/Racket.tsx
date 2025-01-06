import { Clone } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { FC } from "react";
import { PositionType } from "src/types";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const OBJ_FILE = "racket.obj";

export const Racket: FC<{
  id: string;
  racketPosition: PositionType;
  racketRotation: PositionType;
}> = ({ id, racketPosition, racketRotation }) => {
  const model = useLoader(OBJLoader, OBJ_FILE);
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
