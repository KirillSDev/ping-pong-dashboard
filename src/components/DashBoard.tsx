import { FC, useEffect, useState } from "react";

export const DashBoard: FC = () => {
  const [firstTeamPoints, setFirstTeamPoints] = useState(0);
  const [secondTeamPoints, setSecondTeamPoints] = useState(0);
  useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setFirstTeamPoints((prev) => prev + 1);
      }
      if (event.key === "2") {
        setSecondTeamPoints((prev) => prev + 1);
      }
      if (event.key === "-") {
        setFirstTeamPoints(0);
        setSecondTeamPoints(0);
      }
    };
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-container--point">{firstTeamPoints}</div>
        <div className="dashboard-container--point">:</div>
        <div className="dashboard-container--point">{secondTeamPoints}</div>
      </div>
    </div>
  );
};
