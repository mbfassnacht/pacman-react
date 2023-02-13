import React from "react";
import styled from "styled-components";
import { Position } from "../types/position";
import colors from "../styles/Colors";
import { useGameContext } from "../context/GameContext";
import { GAME_STATUS } from "../types/gameStatus";

interface StyledFoodProps {
  position: Position;
  hidden: boolean;
}

const eatPrecision = 18;

export type FoodProps = {
  name: string;
  position: Position;
  hidden: boolean;
  pacmanSize: number;
};

const Food = (props: FoodProps) => {
  const position = props.position;
  const [isHidden, setIsHidden] = React.useState(false);
  const { pacmanPosition, setPoints, points, foodAmount, setGameStatus } =
    useGameContext();

  function eaten() {
    setIsHidden(true);
  }

  React.useEffect(() => {
    function gameRestarted() {
      setIsHidden(false);
    }

    document.addEventListener("restart-game", gameRestarted);
    return () => document.removeEventListener("restart-game", gameRestarted);
  }, []);

  React.useEffect(() => {
    if (
      !isHidden &&
      pacmanPosition.left + (props.pacmanSize - eatPrecision) / 2 >=
        position.left &&
      pacmanPosition.left - (props.pacmanSize - eatPrecision) / 2 <
        position.left &&
      pacmanPosition.top + (props.pacmanSize - eatPrecision) / 2 >=
        position.top &&
      pacmanPosition.top - (props.pacmanSize - eatPrecision) / 2 < position.top
    ) {
      eaten();
      if (foodAmount === points + 1) {
        setGameStatus(GAME_STATUS.WON);
      }
      setPoints(points + 1);
    }
  }, [pacmanPosition, position]);

  return (
    <StyledFood position={props.position} hidden={isHidden}>
      <div className="effective-food"></div>
    </StyledFood>
  );
};

const StyledFood = styled.div<StyledFoodProps>`
  width: 60px;
  height: 60px;
  position: absolute;
  display: ${(props) => (props.hidden ? "none" : "block")};
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;

  .effective-food {
    border-radius: 50px;
    width: 10px;
    height: 10px;
    background-color: ${colors.color2};
    margin: 20px;
  }
`;

export default Food;
