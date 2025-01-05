import { useGSAP } from "@gsap/react";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

type PositionType = [number, number, number];
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
export const Ball = () => {
  const model = useRef<Mesh>(null);
  const { position } = useControls("Ball", {
    position: {
      value: RACKET_2_POS,
      step: 0.01,
    },
  });
  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(model.current.position, {
      ...getPositions(RACKET_1_TABLE_POS),
      duration: 0.7,
    });
    tl.to(model.current.position, {
      ...getPositions(RACKET_1_POS),
      duration: 0.4,
    });
    tl.to(model.current.position, {
      ...getPositions(RACKET_2_TABLE_POS),
      duration: 0.7,
    });
    tl.to(model.current.position, {
      ...getPositions(RACKET_2_POS),
      duration: 0.4,
    });
  }, []);
  return (
    <mesh ref={model} position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.05, 32, 32]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};
