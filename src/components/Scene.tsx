import React from "react";
import Pacman from "./Pacman";
import Ghost from "./Ghost";
import Food from "./Food";
import styled from "styled-components";
import colors from "../styles/Colors";
import { useGameContext } from "../context/GameContext";
import { GAME_STATUS } from "../types/gameStatus";
import { COLOR } from "../types/color";
import { DIFFICULTY, Difficulty } from "../types/difficulty";

type SceneProps = {
  foodSize: number;
  border: number;
  topScoreBoard: number;
};

const pacmanSize = 60;
const pacmanVelocity = 30;
const ghostSize = 60;
const topScoreBoardHeight = 100;

const generateFoodMatrix = (props: SceneProps, amountOfFood: number) => {
  let currentTop = 0;
  let currentLeft = 0;
  const foods = [];

  for (let i = 0; i <= amountOfFood; i++) {
    if (currentLeft + props.foodSize >= window.innerWidth - props.border) {
      currentTop += props.foodSize;
      currentLeft = 0;
    }
    if (
      currentTop + props.foodSize >=
      window.innerHeight - props.border - props.topScoreBoard
    ) {
      break;
    }
    const position = { left: currentLeft, top: currentTop };
    currentLeft = currentLeft + props.foodSize;
    foods.push(
      <Food
        pacmanSize={pacmanSize}
        hidden={false}
        name={"food" + i}
        position={position}
        key={i}
      />
    );
  }
  return foods;
};

const Scene = (props: SceneProps) => {
  const {
    setFoodAmount,
    restartGame,
    setDifficulty,
    setGameStatus,
    foodAmount,
    gameStatus,
    difficulty,
  } = useGameContext();

  const [ghostVelocity, setGhostVelocity] = React.useState(20);

  React.useEffect(() => {
    if (difficulty === DIFFICULTY.EASY) {
      setGhostVelocity(15);
    }
    if (difficulty === DIFFICULTY.MEDIUM) {
      setGhostVelocity(20);
    }
    if (difficulty === DIFFICULTY.ADVANCED) {
      setGhostVelocity(30);
    }
  }, [difficulty]);

  React.useEffect(() => {
    const amountOfFood =
      Math.floor((window.innerWidth - props.border) / props.foodSize) *
      Math.floor(
        (window.innerHeight - props.border - props.topScoreBoard) /
          props.foodSize
      );

    setFoodAmount(amountOfFood);
  }, []);

  return (
    <StyledScene>
      {gameStatus !== GAME_STATUS.IN_PROGRESS &&
        gameStatus !== GAME_STATUS.PAUSED && (
          <OverlayContent>
            {gameStatus === GAME_STATUS.WON ? (
              <CenterContainer>
                <div>
                  <strong>Congratulations :)</strong>
                </div>
                <StyledButton onClick={() => restartGame()}>
                  Play again
                </StyledButton>
              </CenterContainer>
            ) : (
              <CenterContainer>
                <div>
                  <strong>GAME OVER :(</strong>
                </div>
                <StyledButton onClick={() => restartGame()}>
                  Try Again
                </StyledButton>
              </CenterContainer>
            )}
          </OverlayContent>
        )}
      {gameStatus === GAME_STATUS.PAUSED && (
        <OverlayContent>
          <CenterContainer>
            <div>
              <span>Set Difficulty</span>
            </div>
            <div>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              >
                <option value={DIFFICULTY.EASY}>Easy</option>
                <option value={DIFFICULTY.MEDIUM}>Medium</option>
                <option value={DIFFICULTY.ADVANCED}>Advanced</option>
              </select>
            </div>

            <StyledButton
              onClick={() => setGameStatus(GAME_STATUS.IN_PROGRESS)}
            >
              Play!
            </StyledButton>
          </CenterContainer>
        </OverlayContent>
      )}
      {generateFoodMatrix(props, foodAmount)}
      <Pacman
        velocity={pacmanVelocity}
        size={pacmanSize}
        border={20}
        topScoreBoard={topScoreBoardHeight}
        name="pacman"
        color={colors.color2}
      ></Pacman>
      <Ghost
        velocity={ghostVelocity}
        size={ghostSize}
        border={20}
        topScoreBoard={topScoreBoardHeight}
        color={COLOR.RED}
        name="ghost1"
      ></Ghost>
      <Ghost
        velocity={ghostVelocity}
        size={ghostSize}
        border={20}
        topScoreBoard={topScoreBoardHeight}
        color={COLOR.GREEN}
        name="ghost2"
      ></Ghost>
      {difficulty !== DIFFICULTY.EASY && (
        <Ghost
          velocity={ghostVelocity}
          size={ghostSize}
          border={20}
          topScoreBoard={topScoreBoardHeight}
          color={COLOR.BLUE}
          name="ghost3"
        ></Ghost>
      )}
      {difficulty === DIFFICULTY.ADVANCED && (
        <Ghost
          velocity={ghostVelocity}
          size={ghostSize}
          border={20}
          topScoreBoard={topScoreBoardHeight}
          color={COLOR.ORANGE}
          name="ghost4"
        ></Ghost>
      )}
    </StyledScene>
  );
};

const CenterContainer = styled.div`
  position: absolute;
  margin: 0 auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 9999;
  background-color: ${colors.color2};
  color: ${colors.color3};
  padding: 20px;
  button {
    cursor: pointer;
  }
`;

const OverlayContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  font-size: 40px;
`;

const StyledScene = styled.div`
  --container-width: 100vw - 20px;
  height: calc(100vh - 120px);
  width: calc(var(--container-width));
  background-color: ${colors.color1};
  position: relative;
  border: 10px ${colors.color3} solid;
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 24px;
  background-color: ${colors.color1};
  color: ${colors.color2};
  border: 1px ${colors.color3} solid;
  cursor: pointer;

  :hover {
    background-color: ${colors.color2};
    color: ${colors.color1};
  }
`;

export default Scene;
