import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { FC, MutableRefObject, useRef } from "react";
import { DirectionalLight, Vector3, DirectionalLightHelper } from "three";

const useLightControls = (
  directionalLightRef: MutableRefObject<DirectionalLight>
) => {
  return useControls("Direction Light", {
    position: {
      value: { x: -8, y: 6, z: -8 },
      step: 0.01,
    },
    intensity: {
      value: 30,
      step: 1,
    },
    shadowMapSizeWidth: {
      value: 1024,
      min: 512,
      max: 4096,
      step: 16,
    },
    shadowMapSizeHeight: {
      value: 1024,
      min: 512,
      max: 4096,
      step: 16,
    },
  });
};

export const Light: FC = () => {
  const directionalLightRef = useRef<DirectionalLight>(null);
  const { position, shadowMapSizeHeight, shadowMapSizeWidth, intensity } =
    useLightControls(directionalLightRef);
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "yellow");
  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={new Vector3(position.x, position.y, position.z)}
        intensity={intensity}
        castShadow
        shadow-mapSize-width={shadowMapSizeWidth}
        shadow-mapSize-height={shadowMapSizeHeight}
      />
      <spotLight position={new Vector3(0, position.y, 0)} intensity={100} />
      <ambientLight intensity={10} color={"white"} />
    </>
  );
};
