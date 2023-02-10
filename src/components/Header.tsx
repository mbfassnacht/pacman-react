import React from "react";
import colors from "../styles/Colors";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { useInterval } from "../hooks/useInterval";
import { GAME_STATUS } from "../types/gameStatus";

const Header = () => {
  const { points, foodAmount, gameStatus } = useGameContext();
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  React.useEffect(() => {
    document.addEventListener("restart-game", gameRestarted);
    return () => document.removeEventListener("restart-game", gameRestarted);
  }, []);

  function gameRestarted() {
    setTimeElapsed(0);
  }

  useInterval(() => {
    if (gameStatus === GAME_STATUS.IN_PROGRESS) {
      setTimeElapsed((previuosTime) => {
        return previuosTime + 1;
      });
    }
  }, 1000);

  return (
    <StyledHeader>
      <span className="left title">PACMAN</span>
      <div className="right score">
        <div>
          <strong>Score: </strong>
          <span className="points">
            {points} / {foodAmount}
          </span>
        </div>
        <div>
          <strong>Time elapsed: </strong>
          <span className="points">{timeElapsed}</span>
        </div>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  height: 100px;
  background-color: ${colors.color3};
  color: ${colors.color2};
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;

  .title {
    font-size: 80px;
    text-align: left;
    margin-top: 10px;
  }

  .score {
    font-size: 34px;
    text-align: right;
    margin-top: 10px;
  }
`;

export default Header;
