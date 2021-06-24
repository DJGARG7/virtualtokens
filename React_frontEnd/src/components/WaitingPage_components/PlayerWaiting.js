import { useState, useEffect } from "react";
import Game from "../GameStart_components/Game";
const PlayerWaiting = ({ gameCode, socket }) => {
  const [balance, setBalance] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    socket.on("game-state", (game, message, rank) => {
      if (rank === 0) {
        setBalance(game.players[socket.id].balance);
        setGameStarted(game.gameStarted);
      }
    });
  }, []);

  return (
    <div>
      {gameStarted ? (
        <Game
          isHost={false}
          socket={socket}
          gameId={gameCode}
          balance={balance}
        />
      ) : (
        <div>
          <div> Game ID: {gameCode} </div>
          <div>Share this code with your friends</div>
          <div>My Balance :{balance}</div>
          <div>Waiting for host to start the game</div>
        </div>
      )}
    </div>
  );
};

export default PlayerWaiting;
