import React from "react";
import gameLogo from "./assets/game-logo.png";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

/* Ha van lehetoseg ra, akkor oldjunk meg valtozasokat useState nelkul, 
mert ez gyositja a futast */
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  /*  
      Belep: ha nem inicializalas es az elozo X volt, ekkor O-ra modosul, 
      Nem le be: ha inicializalas vagy az elozo O-volt, ekkor a currentPlayer X marad
  */
  if (gameTurns.length > 0 && gameTurns[gameTurns.length - 1].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

const deriveWinner = (gameBoard, players) => {
  let winner = undefined;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSymbol
      && firstSquareSymbol === secondSquareSymbol
      && firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITAL_GAME_BOARD.map(array => [...array])];
  /* 
    Ez csak akkor fut, le ha a gameTurns nem egy ures tomb, 
    amugy a gameboard marad az init

    Az App componens gameTurns state-ben gyulnek a logok, 
    XY koordinata modosul Player Z altal tipusu sorokkal
    ezen sorokbol kiolvassuk a megfelelo adatokat,
    majd feltoltjuk a gameBoardot
  */

    for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {

  const [players, setPlayers] = React.useState(PLAYERS);
  const [gameTurns, setGameTurns] = React.useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);  
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  const handleSelectSquare = (rowIndex, colIndex) => {

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        ...prevTurns,
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
      ];
      console.log(updatedTurns.length);
      return updatedTurns;
    });
  }

  const handleRestart = () => {
    setGameTurns(() => []);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <>
      <header>
        <img src={gameLogo} />
        <h1>Tic-Tac-Toe</h1>
      </header>
      <section id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange} />
          <Player
            initialName={PLAYERS.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </section>
      <section>
        <Log turns={gameTurns} />
      </section>
    </>
  )
}

export default App
