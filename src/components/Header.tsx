import React from "react";
import colors from "../styles/Colors";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";

const Header = () => {
  const { points } = useGameContext();

  return (
    <StyledHeader>
      <span className="left title">PACMAN</span>
      <span className="right score">
        SCORE: <span className="points">{points}</span>
      </span>
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

  .title {
    font-size: 80px;
    width: 50%;
    text-align: left;
    margin-top: 10px;
    margin-left: 150px;
  }

  .score {
    font-size: 40px;
    width: 50%;
    text-align: right;
    margin-top: 10px;
  }
`;

export default Header;
