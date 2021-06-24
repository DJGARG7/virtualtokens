import { useEffect, useState } from "react";
import ChildTry from "./ChildTry";
const GamePlay = ({ balance, socket, gameId }) => {
  const [tableBalance, setTableBalance] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("game-state", (game, message, rank) => {
      if (rank === 1) {
        setTableBalance(game.tableBalance);
        setMessage(message);
      }
    });
  }, []);

  return (
    <div>
      <div>Table Balance</div>
      <div>{tableBalance}</div>
      <ChildTry balance={balance} socket={socket} gameID={gameId} />
      <div>{message}</div>
    </div>
  );
};
export default GamePlay;
