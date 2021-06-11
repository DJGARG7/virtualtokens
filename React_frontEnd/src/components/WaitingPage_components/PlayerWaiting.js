import { useEffect, useState } from "react";
import TheGame from "../GameStart_components/TheGame";
import "./style.css";
const PlayerWaiting = (props) => {
  const [balance, setBalance] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const balanceHandler = (bal) => {
    setBalance(bal);
  };

  props.socket.on("updated-balance", (newBalance) =>
    balanceHandler(newBalance)
  );
  // do something which calls the gameStartedHandler once host clicks on Start Game

  const gameStartedHandler = () => {
    setGameStarted(true);
  };
  const roomid = props.gameCode;
  return (
    <div>
      {!gameStarted && (
        <div>
          <div> Game ID: {roomid} </div>
          <div>Share this code with your friends</div>
          <div>My Balance :{balance}</div>
          <div>Waiting for host to start the game</div>
        </div>
      )}
      {gameStarted && <TheGame />}
    </div>
  );
};

export default PlayerWaiting;
