import { useState,useEffect } from 'react'
import './App.css'

function Square({ value, onclick }) {
  return <button className='square' onClick={onclick}>{value}</button>
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [isXTurn, setisXTurn] = useState(true);
  const [status,setStatus] = useState("");

  const handleClick = (cur)=>{
    let cpy = [...squares];
    if(checkWinner(cpy) || cpy[cur]) return;
    cpy[cur] = isXTurn ? 'X' : 'O';
    setisXTurn(!isXTurn)
    setSquares(cpy)
  }

  function handleRestart() {
    setisXTurn(true)
    setSquares(Array(9).fill(''))
  }

  function checkWinner(squares) {
    const winningPatterns = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x,y,z] = winningPatterns[i]
      if(squares[x] && squares[x] === squares[y] && squares[x] === squares[z] ){
        return squares[x]
      }
    }
    return null
  }

  useEffect(() => {
    if(!checkWinner(squares) && squares.every(item=> item!=='')){
      setStatus(`This is a draw!Please restart the game`);

    } else if(checkWinner(squares)){
      setStatus(`Winner is ${checkWinner(squares)}`)
    } else {
      setStatus(`Next player is ${isXTurn ? 'X' : 'O'}`)
    }
    
  }, [squares],isXTurn)
  
  return (
    <div className='container'>
      <div className='row'>
        <Square value={squares[0]} onclick={() => handleClick(0)} />
        <Square value={squares[1]} onclick={() => handleClick(1)} />
        <Square value={squares[2]} onclick={() => handleClick(2)} />
      </div>
      <div className='row'>
        <Square value={squares[3]} onclick={() => handleClick(3)} />
        <Square value={squares[4]} onclick={() => handleClick(4)} />
        <Square value={squares[5]} onclick={() => handleClick(5)} />
      </div>
      <div className='row'>
        <Square value={squares[6]} onclick={() => handleClick(6)} />
        <Square value={squares[7]} onclick={() => handleClick(7)} />
        <Square value={squares[8]} onclick={() => handleClick(8)} />
      </div>  
      <div>
        <h1>{status}</h1>
      </div>
      <div className='b'>
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  )
}

export default App
