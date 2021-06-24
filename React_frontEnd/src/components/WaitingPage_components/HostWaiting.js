import { useState, useEffect } from "react";
import Game from "../GameStart_components/Game";
import AddMoney from "./AddMoney";
const HostWaiting = ({ gameCode, isHost, socket }) => {
  const [gameStarted, setGameStarted] = useState(false);

  // players: Player[]
  // Player -> {playerID, playerName, isHost, balance}
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("game-state", (game, message, rank) => {
      if (rank === 0) {
        const playerList = Object.keys(game.players).map(
          (playerID) => game.players[playerID]
        );
        setPlayers(playerList);
      }
    });
  }, []);

  const startGameHandler = () => {
    setGameStarted(true);
    socket.emit("start-game", gameCode);
  };

  return (
    <div className="parts">
      {gameStarted ? (
        <Game
          isHost={isHost}
          socket={socket}
          gameId={gameCode}
          balance={players.filter((player) => player.isHost)[0].balance}
        />
      ) : (
        <div>
          <div>Room Created Sucessfully</div>
          <div>
            <button
              className="button"
              onClick={startGameHandler}
              disabled={players.length <= 1}
            >
              Start the Game
            </button>
          </div>
          <div>Game ID: {gameCode}</div>
          <div>Share this with your friends</div>
          <div>Lobby:</div>
          <div>
            <table>
              <tr>
                {players.map((player) => (
                  <AddMoney
                    player={player}
                    socket={socket}
                    gameId={gameCode}
                    key={player.playerID}
                  />
                ))}
              </tr>
            </table>
            <p>
              Note: Add negative value if you want to reduce current balance
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostWaiting;
