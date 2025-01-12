import { FC, StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { PingPongTable } from "./components/PingPongTable";
import { OrbitControls, Html } from "@react-three/drei";
import { Light } from "./components/Light";
import { PlaneFloor } from "./components/PlaneFloor";
import { Racket } from "./components/Racket";
import { Ball } from "./components/Ball";
import { RacketSettings } from "./types";
import gsap from "gsap";
import { DoubleSide } from "three";
import { useControls } from "leva";

const RACKET_1: RacketSettings = {
  position: [-3, 0.8, 0.5],
  rotation: [1.3, -0.3, -1.6],
} as const;

const RACKET_2: RacketSettings = {
  position: [3, 0.8, -0.5],
  rotation: [-1.2, -0.3, -1.3],
};

export const App: FC = () => {
  const { firstTeamText, secondTeamText } = useControls("Teams", {
    firstTeamText: {
      value: "team_1",
    },
    secondTeamText: {
      value: "team_2",
    },
  });
  const tl = gsap.timeline({ repeat: -1 });
  return (
    <StrictMode>
      <div className="container">
        <Canvas shadows camera={{ position: [4, 2, 2], fov: 65 }}>
          <OrbitControls />
          <Light />
          <PingPongTable />
          <Racket
            racketPosition={RACKET_1.position}
            racketRotation={RACKET_1.rotation}
            id="RacketPos_1"
          />
          <Ball tl={tl} />
          <Racket
            racketPosition={RACKET_2.position}
            racketRotation={RACKET_2.rotation}
            id="RacketPos_2"
          />
          <PlaneFloor />
          <Html
            occlude
            castShadow
            receiveShadow
            position={[
              RACKET_1.position[0],
              RACKET_1.position[1] + 0.8,
              RACKET_1.position[2],
            ]}
            material={<meshPhysicalMaterial side={DoubleSide} opacity={0.1} />}
          >
            <div
              style={{ color: "white", textAlign: "center", fontSize: "20px" }}
            >
              {firstTeamText}
            </div>
          </Html>
          <Html
            occlude
            castShadow
            receiveShadow
            position={[
              RACKET_2.position[0],
              RACKET_2.position[1] + 0.8,
              RACKET_2.position[2],
            ]}
            material={<meshPhysicalMaterial side={DoubleSide} opacity={0.1} />}
          >
            <div
              style={{ color: "white", textAlign: "center", fontSize: "20px" }}
            >
              {secondTeamText}
            </div>
          </Html>
        </Canvas>
      </div>
    </StrictMode>
  );
};
