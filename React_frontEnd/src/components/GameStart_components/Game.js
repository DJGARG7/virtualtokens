import { useState, useEffect } from "react";
import Summary from "../EndGame/Summary";
import GamePlay from "./GamePlay";
import HostControls from "./HostControls";

const Game = ({ isHost, socket, gameId, balance }) => {
  const [gameEnd, setGameEnd] = useState(false);
  useEffect(() => {
    socket.on("display-summary", (game) => {
      setGameEnd(prevState=>true);
    });
  }, []);

  return (
    <div>
      {!gameEnd ? (
        <div>
          {isHost && <HostControls socket={socket} gameId={gameId} />}
          <GamePlay balance={balance} socket={socket} gameId={gameId} />
        </div>
      ) : (
        <div>
          <Summary socket={socket} gameId={gameId}/>
        </div>
      )}
    </div>
  );
};
export default Game;
