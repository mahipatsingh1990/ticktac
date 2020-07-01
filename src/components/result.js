import React from 'react';
import { HUMAN, COMPUTER} from '../constants.js';

function Result({ winner, reset }) {
  return (
    <div className="winner">
      <h1>
        {winner == HUMAN && 'Congrats, you won!'}
        {winner == COMPUTER && 'Sorry, you lost this time'}
        {winner == 'It is a tie' && 'It is a tie'}
      </h1>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

export default Result;