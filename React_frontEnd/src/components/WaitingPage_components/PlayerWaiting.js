import { useState } from "react";
import TheGame from "../GameStart_components/TheGame";
import "./style.css";
const PlayerWaiting = (props) => {
  const [balance, setBalance] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // do something which gets the balance from socket and call balanceHandler

  const balanceHandler = (bal) => {
    setBalance(bal);
  };

  // do something which calls the gameStartedHandler once host clicks on Start Game

  const gameStartedHandler = () => {
    setGameStarted(true);
  };
  const roomid = props.gameCode;
  const myBalance = balance;
  return (
    <div>
      {!gameStarted && (
        <div>
          <div> Game ID: {roomid} </div>
          <div>Share this code with your friends</div>
          <div>My Balance :{myBalance}</div>
          <div>Waiting for host to start the game</div>
        </div>
      )}
      {gameStarted && <TheGame />}
    </div>
  );
};

export default PlayerWaiting;
