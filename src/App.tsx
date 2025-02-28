import { FC, StrictMode, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PingPongTable } from "./components/PingPongTable";
import { OrbitControls, Html, Text3D } from "@react-three/drei";
import { Light } from "./components/Light";
import { PlaneFloor } from "./components/PlaneFloor";
import { Racket } from "./components/Racket";
import { Ball } from "./components/Ball";
import { RacketSettings } from "./types";
import gsap from "gsap";
import { Color, DoubleSide, Fog } from "three";
import { useControls, Leva } from "leva";
import { DashBoard } from "./components/DashBoard";

const RACKET_1: RacketSettings = {
  position: [-3, 0.8, 0.5],
  rotation: [1.3, -0.3, -1.6],
} as const;

const RACKET_2: RacketSettings = {
  position: [3, 0.8, -0.5],
  rotation: [-1.2, -0.3, -1.3],
};

export const App: FC = () => {
  const [firstTeamPoints, setFirstTeamPoints] = useState(0);
  const [secondTeamPoints, setSecondTeamPoints] = useState(0);
  const [firstTeamWins, setfirstTeamWins] = useState(0);
  const [secondTeamWins, setSecondTeamWins] = useState(0);
  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setFirstTeamPoints((prev) => prev + 1);
      }
      if (event.key === "2") {
        setSecondTeamPoints((prev) => prev + 1);
      }
      if (event.key === "3") {
        setFirstTeamPoints((prev) => {
          if (prev !== 0) {
            return prev - 1;
          }
          return prev;
        });
      }
      if (event.key === "4") {
        setSecondTeamPoints((prev) => {
          if (prev !== 0) {
            return prev - 1;
          }
          return prev;
        });
      }
      if (event.key === "5") {
        setfirstTeamWins((prev) => prev + 1);
      }
      if (event.key === "6") {
        setSecondTeamWins((prev) => prev + 1);
      }
      if (event.key === "7") {
        setfirstTeamWins((prev) => {
          if (prev !== 0) {
            return prev - 1;
          }
          return prev;
        });
      }
      if (event.key === "8") {
        setSecondTeamWins((prev) => {
          if (prev !== 0) {
            return prev - 1;
          }
          return prev;
        });
      }
      if (event.key === "-") {
        setFirstTeamPoints(0);
        setSecondTeamPoints(0);
      }
      if (event.key === "=") {
        setfirstTeamWins(0);
        setSecondTeamWins(0);
      }
    };
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, []);
  const { firstTeamText, secondTeamText } = useControls("Teams", {
    firstTeamText: {
      value: "Spin Masters",
    },
    secondTeamText: {
      value: "Paddle Ninjas",
    },
  });
  const tl = gsap.timeline({ repeat: -1 });
  return (
    <StrictMode>
      <div className="container">
        <DashBoard
          firstTeamPoints={firstTeamPoints}
          secondTeamPoints={secondTeamPoints}
        />
        <Canvas
          scene={{
            background: new Color("rgb(188, 212, 239)"),
          }}
          shadows
          camera={{ position: [10, 4, 10], fov: 65 }}
        >
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
          <Text3D
            font={"roboto.json"}
            size={0.4}
            position={[-4, 2, 6]}
            rotation={[0, Math.PI / 3.5, 0]}
          >
            {firstTeamText}: {firstTeamWins}
            <meshStandardMaterial color={new Color("#1a0d00")} />
          </Text3D>
          {/* <Html
            occlude
            castShadow
            receiveShadow
            position={[
              RACKET_1.position[0],
              RACKET_1.position[1] + 1.8,
              RACKET_1.position[2],
            ]}
            material={<meshPhysicalMaterial side={DoubleSide} opacity={0.1} />}
          >
            <div className="team-text--container">
              <div className="team-text">{firstTeamText}</div>
            </div>
          </Html> */}
          <Text3D
            font={"roboto.json"}
            size={0.4}
            position={[3, 2, -0.5]}
            rotation={[0, Math.PI / 6, 0]}
          >
            {secondTeamWins} :{secondTeamText}
            <meshStandardMaterial color={new Color("#1a0d00")} />
          </Text3D>
          {/* <Html
            occlude
            castShadow
            receiveShadow
            position={[
              RACKET_2.position[0],
              RACKET_2.position[1] + 1.8,
              RACKET_2.position[2],
            ]}
            material={<meshPhysicalMaterial side={DoubleSide} opacity={0.1} />}
          >
            <div className="team-text--container">
              <div className="team-text">{secondTeamText}</div>
            </div>
          </Html> */}
        </Canvas>
      </div>
      <Leva collapsed hidden={false} />
    </StrictMode>
  );
};
