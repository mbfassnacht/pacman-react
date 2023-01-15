import React from "react";
import "./App.css";
import Header from "./components/Header";
import Scene from "./components/Scene";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <div className="pacman-app">
      <GameProvider>
        <Header />
        <Scene foodSize={60} border={20} topScoreBoard={100} />
      </GameProvider>
    </div>
  );
}

export default App;
