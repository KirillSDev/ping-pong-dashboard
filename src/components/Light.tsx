import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { FC, MutableRefObject, useRef } from "react";
import {
  DirectionalLight,
  Vector3,
  DirectionalLightHelper,
  SpotLight,
  SpotLightHelper,
  Color,
} from "three";

const useLightControls = (
  directionalLightRef: MutableRefObject<DirectionalLight>
) => {
  return useControls("Direction Light", {
    position: {
      value: { x: -8, y: 6, z: -8 },
      step: 0.01,
    },
    intensity: {
      value: 5,
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
  const spotLightRef = useRef<SpotLight>(null);
  const { position, shadowMapSizeHeight, shadowMapSizeWidth, intensity } =
    useLightControls(directionalLightRef);
  useHelper(directionalLightRef, DirectionalLightHelper, 1, "yellow");
  // useHelper(spotLightRef, SpotLightHelper, 1);
  const {
    position: reactAreaPos,
    intensity: reactAreaInt,
    width,
    height,
    distance,
  } = useControls("React Area Light", {
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.01,
    },
    intensity: {
      value: 100,
      step: 1,
    },
    distance: {
      value: 10,
      step: 1,
    },
    width: {
      value: 2,
      step: 0.1,
    },
    height: {
      value: 2,
      step: 0.1,
    },
  });
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
      <pointLight
        position={new Vector3(reactAreaPos.x, reactAreaPos.y, reactAreaPos.z)}
        intensity={reactAreaInt}
        distance={distance}
        color={"white"}
      />
      <spotLight
        ref={spotLightRef}
        position={new Vector3(0, 2, 0)}
        distance={100}
        intensity={100}
        color={new Color("red")}
      />
    </>
  );
};
