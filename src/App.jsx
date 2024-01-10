import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/Gameover.jsx";

const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
}

const INITIALGAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns){
  let currPlayer  = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X') currPlayer = 'O';

  return currPlayer;
}


function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIALGAMEBOARD.map(array => [...array])];

  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players){
  let winner;
  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const seccondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if(firstSquareSymbol && 
      firstSquareSymbol === seccondSquareSymbol && 
      firstSquareSymbol === thirdSquareSymbol){
        console.log(`winner ${winner}`);
        winner = players[firstSquareSymbol];
      }
  }
  return winner;
}


function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer  = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }


  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChanged={handlePlayerNameChange}/>
        <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChanged={handlePlayerNameChange}/>
      </ol>
      {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App;
