import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [player, setPlayer] = useState("user");
  const [box, setBox] = useState(new Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const user = (id) => {
    const newBox = [...box];
    if (box[id] === "" && player === "user" && winner === "") {
      newBox[id] = currentPlayer;
      setBox(newBox);
      const changePlayer = currentPlayer === "X" ? "0" : "X";
      const changedPlayer = player === "user" ? "computer" : "user";
      setPlayer(changedPlayer);
      setCurrentPlayer(changePlayer);
      checkWinner(box);
    }
  };

  const computer = () => {
    let random = Math.ceil(Math.random(box) * box.length) - 1;
    const newBox = [...box];
    while (newBox[random] !== "") {
      random = Math.ceil(Math.random(box) * box.length) - 1;
    }
    newBox[random] = currentPlayer;
    setBox(newBox);
    const changePlayer = currentPlayer === "X" ? "0" : "X";
    const changedPlayer = player === "user" ? "computer" : "user";
    setPlayer(changedPlayer);
    setCurrentPlayer(changePlayer);
    checkWinner(newBox);
  };

  useEffect(() => {
    if (player === "computer" && winner === "") {
      setTimeout(() => computer(), 1000);
    }
  }, [currentPlayer]);

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      const draw = box.reduce((each) => each === "");
      if (board[a] === board[b] && board[a] === board[c] && board[a] !== "") {
        setWinner(board[a]);
        break;
      }
      console.log(draw);
    }
  };

  const restartGame = () => {
    setBox(new Array(9).fill(""));
    setWinner("");
  };

  const hideClass = winner !== "" ? "" : "hide-modal";
  return (
    <div className='App'>
      <h1>Tic Tac Toe</h1>
      <div className={`modal ${hideClass}`}>
        <p>
          The winner is {player} <span>&#128516;</span> !
        </p>
        <button className='button' onClick={restartGame}>
          Restart
        </button>
      </div>
      <div className='box-container'>
        {box.map((each, index) => (
          <div
            key={index}
            type='text'
            value={each}
            className='input'
            onClick={() => user(index)}
          >
            {each}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
