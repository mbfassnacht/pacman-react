import React from "react";
import styled from "styled-components";
import { Position } from "../types/position";
import { ARROW, DIRECTION, Direction } from "../types/direction";
import { Character } from "../types/character";
import { useGameContext } from "../context/GameContext";
import { useInterval } from "../hooks/useInterval";
import { COLOR } from "../types/color";

interface StyledPacmanProps {
  direction: Direction;
  position: Position;
  color: string;
}

const PacmanIcon = () => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 532.3 561.9"
  >
    <g>
      <g>
        <path
          d="M532.3,156.5c-83.6,41.4-167.1,82.7-251.4,124.4c84.1,42.2,167.3,84,250.5,125.9c-48.3,100.6-165.6,172-294.4,151.5
			C98.2,536.2,0.3,417,0,281.5C-0.3,149.8,92.2,30.8,228.9,4.9C360.6-19.9,482,51.6,532.3,156.5z M328.5,159.6
			c21-0.1,37.9-16.4,37.9-36.5s-16.9-36.4-37.9-36.5c-21.2-0.1-38.3,16.4-38.1,36.7C290.5,143.5,307.6,159.7,328.5,159.6z"
        />
        <path
          fill="black"
          d="M328.5,159.6c-21,0.1-38-16.1-38.1-36.3c-0.1-20.3,17-36.8,38.1-36.7c21,0.1,37.9,16.4,37.9,36.5S349.5,159.5,328.5,159.6
			z"
        />
      </g>
    </g>
  </svg>
);

const Pacman = (props: Character) => {
  const {
    gameEnded,
    pacmanPosition: position,
    setPacmanPosition,
  } = useGameContext();
  const [direction, setDirection] = React.useState<Direction>(DIRECTION.LEFT);
  const [color, setColor] = React.useState<string>(props.color);
  useInterval(move, 100);

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("restart-game", gameRestarted);

    return () => {
      document.removeEventListener("restart-game", gameRestarted);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function gameRestarted() {
    setColor(props.color);
  }

  function handleKeyDown(e: any) {
    const arrows = [ARROW.LEFT, ARROW.UP, ARROW.RIGHT, ARROW.DOWN];

    if (arrows.indexOf(e.keyCode) >= 0) {
      rotate(e.keyCode);
    }
  }

  function move() {
    if (!gameEnded) {
      const currentLeft = position.left;
      const currentTop = position.top;
      let newPosition: Position = { top: 0, left: 0 };
      switch (direction) {
        case DIRECTION.LEFT:
          newPosition = {
            top: currentTop,
            left: Math.max(currentLeft - props.velocity, 0),
          };
          break;
        case DIRECTION.UP:
          newPosition = {
            top: Math.max(currentTop - props.velocity, 0),
            left: currentLeft,
          };
          break;
        case DIRECTION.RIGHT:
          newPosition = {
            top: currentTop,
            left: Math.min(
              currentLeft + props.velocity,
              window.innerWidth - props.border - props.size
            ),
          };
          break;

        default:
          newPosition = {
            top: Math.min(
              currentTop + props.velocity,
              window.innerHeight -
                props.size -
                props.border -
                props.topScoreBoard
            ),
            left: currentLeft,
          };
      }
      setPacmanPosition(newPosition);
    } else {
      setColor(COLOR.PACMAN_DEAD);
    }
  }

  function rotate(keypressed: number) {
    if (!gameEnded) {
      switch (keypressed) {
        case ARROW.LEFT:
          setDirection(DIRECTION.LEFT);
          break;
        case ARROW.UP:
          setDirection(DIRECTION.UP);
          break;
        case ARROW.RIGHT:
          setDirection(DIRECTION.RIGHT);
          break;
        default:
          setDirection(DIRECTION.DOWN);
      }
    }
  }

  return (
    <StyledPacman color={color} position={position} direction={direction}>
      <PacmanIcon />
    </StyledPacman>
  );
};

const StyledPacman = styled.div<StyledPacmanProps>`
  width: 60px;
  height: 63px;
  position: absolute;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  transform: ${(props) => {
    switch (props.direction) {
      case DIRECTION.LEFT:
        return "rotateY(180deg)";
      case DIRECTION.UP:
        return "rotate(-90deg)";
      case DIRECTION.DOWN:
        return "rotate(90deg)";
      default:
        return "rotate(0deg)";
    }
  }};

  svg {
    fill: ${(props) => props.color};
  }
`;

export default Pacman;
