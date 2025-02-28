import { FC, useEffect, useState } from "react";

export const DashBoard: FC<{
  firstTeamPoints: number;
  secondTeamPoints: number;
}> = ({ firstTeamPoints, secondTeamPoints }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div>
          <div className="points">
            <div className="pont-container">
              <div className="dashboard-container--point">
                {firstTeamPoints}
              </div>
            </div>
            <img
              className="logo"
              src="./2d-ball-1.png"
              width={160}
              height={160}
            ></img>
            <div className="pont-container">
              <div className="dashboard-container--point">
                {secondTeamPoints}
              </div>
            </div>
          </div>
          <svg className="dashboard-text" width="200" height="300">
            <defs>
              <path
                id="curve"
                d="M0,18 C55,34 152,36 197,20"
                fill="transparent"
              />
            </defs>
            <text fill="black" fontSize="18">
              <textPath href="#curve">Ping-Pong Tournament!</textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};
