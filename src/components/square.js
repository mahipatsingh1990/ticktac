import React from 'react';
import { EMPTY, HUMAN, COMPUTER} from '../constants.js';
import Circle from './circle.js';
import Cross from './cross.js';

function Square({ position, value, takeTurn }) {
  function handleClick() { 
    if(value == EMPTY) takeTurn(position)
  }
  
  return (
    <div className="square" onClick={handleClick}>
      {value == HUMAN && <Cross />}
      {value == COMPUTER && <Circle />}
    </div>
  )
}

export default Square;