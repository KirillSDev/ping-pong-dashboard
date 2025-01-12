import { useGSAP } from "@gsap/react";
import { useControls } from "leva";
import { FC, useRef } from "react";
import { Mesh } from "three";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import { PositionType } from "src/types";

const RACKET_1_TABLE_POS: PositionType = [-1.19, 0.11, 0.29];
const RACKET_1_POS: PositionType = [-2.93, 0.83, 0.62];
const RACKET_2_TABLE_POS: PositionType = [1.92, 0.11, -0.41];
const RACKET_2_POS: PositionType = [2.91, 0.8, -0.6];

gsap.registerPlugin(MotionPathPlugin);
const getPositions = (position: PositionType) => {
  return {
    x: position[0],
    y: position[1],
    z: position[2],
  };
};
export const Ball: FC<{ tl: gsap.core.Timeline }> = ({ tl }) => {
  const model = useRef<Mesh>(null);
  const { position } = useControls("Ball", {
    position: {
      value: RACKET_2_POS,
      step: 0.01,
    },
  });

  useGSAP(() => {
    tl.to(model.current.position, {
      duration: 0.5,
      ease: "none",
      motionPath: {
        path: [
          {
            ...getPositions(RACKET_2_POS),
          },
          {
            x: 0,
            y: 0.5,
            z: 0,
          },
          {
            ...getPositions(RACKET_1_TABLE_POS),
          },
        ],
      },
    });
    tl.to(model.current.position, {
      ease: "none",
      duration: 0.4,
      ...getPositions(RACKET_1_POS),
    });
    tl.to(model.current.position, {
      duration: 0.5,
      ease: "none",
      motionPath: {
        path: [
          {
            ...getPositions(RACKET_1_POS),
          },
          {
            x: 0,
            y: 0.5,
            z: 0,
          },
          {
            ...getPositions(RACKET_2_TABLE_POS),
          },
        ],
        autoRotate: false,
        align: undefined,
        alignOrigin: [0.5, 0.5],
      },
    });
    tl.to(model.current.position, {
      ease: "none",
      duration: 0.4,
      ...getPositions(RACKET_2_POS),
    });
  }, []);
  return (
    <mesh ref={model} position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};
