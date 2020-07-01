import React from 'react';
import logo from './logo.svg';
import './App.css';
import { EMPTY, HUMAN, COMPUTER, initialState} from './constants.js';
import Square from './components/square.js';
import Result from './components/result.js';

// This function calculates the response of the computer after each turn
function calculateResponse(p) { 
  
  // This function gives back the first empty position (if any) that is in a line
  // that is otherwise full of circles / crosses (depending on the parameter)
  function emptyPositionInLineFullOf(player) {
    if(p[0] == EMPTY && (                   // If the first position is empty,
      p[1] == player && p[2] == player ||   // but otherwise the first row is full
      p[3] == player && p[6] == player ||   // or the first column is full
      p[4] == player && p[8] == player      // or the diagonal line starting from first position is full
    )) return 0;                            // then return the first position
                                            // because it's a good position to defend / attack
    
    if(p[1] == EMPTY && (                   // If the second position is empty
      p[0] == player && p[2] == player ||   // but otherwise the first row is full
      p[4] == player && p[7] == player      // or the second column is full
    )) return 1;                            // then return the second position
                                            // because it's a good position to defend / attack
    
    if(p[2] == EMPTY && (
      p[0] == player && p[1] == player || 
      p[5] == player && p[8] == player || 
      p[4] == player && p[6] == player
    )) return 2;

    if(p[3] == EMPTY && (
      p[4] == player && p[5] == player || 
      p[0] == player && p[6] == player
    )) return 3;
    
    if(p[4] == EMPTY && (
      p[3] == player && p[5] == player || 
      p[1] == player && p[7] == player || 
      p[0] == player && p[8] == player || 
      p[2] == player && p[6] == player
    )) return 4;
    
    if(p[5] == EMPTY && (
      p[3] == player && p[4] == player || 
      p[2] == player && p[8] == player
    )) return 5;

    if(p[6] == EMPTY && (
      p[7] == player && p[8] == player || 
      p[0] == player && p[3] == player || 
      p[4] == player && p[2] == player
    )) return 6;
    
    if(p[7] == EMPTY && (
      p[6] == player && p[8] == player || 
      p[1] == player && p[4] == player
    )) return 7;
    
    if(p[8] == EMPTY && (
      p[6] == player && p[7] == player || 
      p[2] == player && p[5] == player || 
      p[4] == player && p[0] == player
    )) return 8;  
  }
  
  // If there's a position the computer can take and win then take it
  const winningPosition = emptyPositionInLineFullOf(COMPUTER);
  if(winningPosition != undefined) return winningPosition;
  
  // Otherwise if there's a position the human can take in next turn to win, then take it
  const defendingPosition = emptyPositionInLineFullOf(HUMAN);
  if(defendingPosition != undefined) return defendingPosition;
  
  // Otherwise pick random position that's empty
  while(true) {
    const randomPosition = Math.floor(Math.random()*9)
    if(p[randomPosition] == EMPTY) return randomPosition;
  }
}

function detectWinner(p) {
  
  // Detects if any row, column or diagonal line is full of circles / crosses (depends on the parameter)
  function lineFullOf(player) {
    if(p[0] == player && p[1] == player && p[2] == player) return true; // First line is full
    if(p[3] == player && p[4] == player && p[5] == player) return true; // Second line is full
    if(p[6] == player && p[7] == player && p[8] == player) return true;

    if(p[0] == player && p[3] == player && p[6] == player) return true; // First column is full
    if(p[1] == player && p[4] == player && p[7] == player) return true;
    if(p[2] == player && p[5] == player && p[8] == player) return true;

    if(p[0] == player && p[4] == player && p[8] == player) return true;
    if(p[2] == player && p[4] == player && p[6] == player) return true;
  }
  
  function gridIsFull() {
    return p.every(position => position != EMPTY);
  }
  
  const playerWon = lineFullOf(HUMAN);
  if(playerWon != undefined) return HUMAN;
  
  const computerWon = lineFullOf(COMPUTER);
  if(computerWon != undefined) return COMPUTER;
  
  const tie = gridIsFull();
  if(tie) return 'It is a tie';
  
  // If nobody won the game and it's not a tie then don't return anything
}



function TicTacToe() {
  const [state, setState] = React.useState(initialState)
  
  const winner = detectWinner(state.positions);
  
  // If the game is not yet finished and it's the computer's turn
  if(winner == undefined && state.player == COMPUTER) {
    // Calculate which position will the computer take
    const position = calculateResponse(state.positions);
    
    // Wait a few milliseconds before the computer goes, make it look like 'thinking'
    setTimeout(() => takeTurn(position), 600)  
  }
  
  function takeTurn(position) {
    const positions = [...state.positions];
    positions[position] = state.player;
    
    setState({
      player: state.player == HUMAN ? COMPUTER : HUMAN,
      positions,
    })
  }
  
  function reset() {
    setState(initialState)
  }
  
  return (
    <div className="App">
      <div className="grid">
        <Square position={0} value={state.positions[0]} takeTurn={takeTurn} />
        <Square position={1} value={state.positions[1]} takeTurn={takeTurn} />
        <Square position={2} value={state.positions[2]} takeTurn={takeTurn} />
        <Square position={3} value={state.positions[3]} takeTurn={takeTurn} />
        <Square position={4} value={state.positions[4]} takeTurn={takeTurn} />
        <Square position={5} value={state.positions[5]} takeTurn={takeTurn} />
        <Square position={6} value={state.positions[6]} takeTurn={takeTurn} />
        <Square position={7} value={state.positions[7]} takeTurn={takeTurn} />
        <Square position={8} value={state.positions[8]} takeTurn={takeTurn} />
      </div>
      {winner != undefined && (<Result winner={winner} reset={reset} />)}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default TicTacToe;
