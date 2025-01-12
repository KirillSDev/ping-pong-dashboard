import { useGSAP } from "@gsap/react";
import { Clone } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { FC, useRef } from "react";
import { PositionType } from "src/types";
import { Group } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import gsap from "gsap";

const OBJ_FILE = "racket.obj";

export const Racket: FC<{
  id: string;
  racketPosition: PositionType;
  racketRotation: PositionType;
}> = ({ id, racketPosition, racketRotation }) => {
  const model = useLoader(OBJLoader, OBJ_FILE);
  const racketRef = useRef<Group>(null);
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
  const racketTl = gsap.timeline({ repeat: -1, yoyo: true });
  useGSAP(() => {
    if (id === "RacketPos_1") {
      racketTl.to(racketRef.current.position, {
        duration: 1,
        y: "+=0.1",
        ease: "sine.inOut",
      });

      racketTl.to(
        racketRef.current.position,
        {
          duration: 1,
          z: "+=0.1",
          ease: "sine.inOut",
        },
        0
      );

      racketTl.to(
        racketRef.current.rotation,
        {
          duration: 1,
          z: "+=0.15",
          ease: "sine.inOut",
        },
        0
      );
    } else {
      racketTl.to(racketRef.current.position, {
        duration: 2,
        y: "+=0.1",
        ease: "sine.inOut",
      });

      racketTl.to(
        racketRef.current.position,
        {
          duration: 0.9,
          z: "-=0.1",
          ease: "sine.inOut",
        },
        0
      );

      racketTl.to(
        racketRef.current.rotation,
        {
          duration: 0.8,
          z: "+=0.25",
          ease: "sine.inOut",
        },
        0
      );
    }
  }, []);
  return (
    <Clone
      ref={racketRef}
      object={model}
      scale={0.02}
      inject={<meshStandardMaterial color="black" />}
      position={position}
      rotation={rotation}
      castShadow
    />
  );
};
