import { FC, StrictMode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PingPongTable } from "./components/PingPongTable";
import { OrbitControls } from "@react-three/drei";
import { Light } from "./components/Light";
import { PlaneFloor } from "./components/PlaneFloor";
import { Racket } from "./components/Racket";

interface RacketSettings {
  position: [number, number, number];
  rotation: [number, number, number];
}

const RACKET_1: RacketSettings = {
  position: [-3, 0.8, 0.5],
  rotation: [1.3, -0.3, -1.6],
} as const;

const RACKET_2: RacketSettings = {
  position: [3, 0.8, -0.5],
  rotation: [-1.2, -0.3, -1.3],
};

export const App: FC = () => {
  return (
    <StrictMode>
      <div className="container">
        <Canvas shadows camera={{ position: [4, 2, 2], fov: 65 }}>
          {/* <OrbitControls /> */}
          <Light />
          <PingPongTable />
          <Racket
            key="RacketPos_1"
            racketPosition={RACKET_1.position}
            racketRotation={RACKET_1.rotation}
            id="RacketPos_1"
          />
          <Racket
            key="RacketPos_2"
            racketPosition={RACKET_2.position}
            racketRotation={RACKET_2.rotation}
            id="RacketPos_2"
          />
          <PlaneFloor />
        </Canvas>
      </div>
    </StrictMode>
  );
};
