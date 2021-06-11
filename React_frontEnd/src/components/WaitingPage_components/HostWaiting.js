import { useState } from "react";
import TheGame from "../GameStart_components/TheGame";
import "./style.css";
import AddMoney from "./addMoney";
const HostWaiting = (props) => {
  const roomid = props.gameCode;
  const [gameStarted, setGameStarted] = useState(false);
  const startGameHandler = () => {
    setGameStarted(true);
  };
  // do something about getting every users name from sockets and then display
  // currently using a dummy playerNames list
  // also how to update balance on each player after clicking add

  const playerNames = [
    { name: "pranav", bal: 500 },
    { name: "dhairya", bal: 1000 },
    { name: "dhananjay", bal: 2000 },
  ];

  return (
    <div className="parts">
      {!gameStarted && (
        <div>
          <div>Room Created Sucessfully</div>
          <div>
            <button onClick={startGameHandler}>Start the Game</button>
          </div>
          <div>Game ID: {roomid}</div>
          <div>Share this with your friends</div>
          <div>Player List in lobby</div>
          <div>
            {playerNames.map((player) => (
              <AddMoney player={player} />
            ))}
          </div>
        </div>
      )}
      {gameStarted && <TheGame ishost={props.ishost} />}
    </div>
  );
};

export default HostWaiting;
