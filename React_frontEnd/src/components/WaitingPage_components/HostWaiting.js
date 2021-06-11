import { useState } from "react";
import TheGame from "../GameStart_components/TheGame";
import "./style.css";
import AddMoney from "./addMoney";
const HostWaiting = (props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const roomid = props.gameCode;

  const startGameHandler = () => {
    setGameStarted(true);
  };

  props.socket.on("get-list", (listed) => {
    // console.log(listed);
    const p = Object.keys(listed).map((playerID) => {
      if (playerID !== "host") {
        // console.log(player);
        let player = listed[playerID];
        player['id'] = playerID;
        return player;
      }
    }).filter(player => !!player);
    console.log(p);
    setPlayers(p);
    // console.log(listed);
  });
  // do something about getting every users name from sockets and then display
  // currently using a dummy playerNames list
  // also how to update balance on each client after clicking add
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
            {players.map((player) => (
              <AddMoney player={player} socket={props.socket} gameId={roomid} />
            ))}
          </div>
        </div>
      )}
      {gameStarted && <TheGame ishost={props.ishost} />}
    </div>
  );
};

export default HostWaiting;
