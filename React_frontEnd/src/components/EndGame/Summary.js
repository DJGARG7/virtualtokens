import { useEffect, useState } from "react";

const Summary = ({ socket, gameId }) => {
  const [players, setPlayers] = useState({});
  useEffect(() => {
    socket.emit("get-summary-data", gameId, (gameInfo) => {
      setPlayers((prevState) => gameInfo.players);
    });
  }, []);
  console.log(players);
  return (
    <div>
      <p>Game Summary</p>
      <div>
          <table>
              <tr>
                  <th>Name</th>
                  <th>Balance</th>
              </tr>
        {Object.keys(players).map((ele) => {
          return (
            <tr>
              <td>{players[ele].playerName}</td>
              <td>{players[ele].balance}</td>
            </tr>
          );
        })}
        </table>
      </div>
      <button
        className="button"
        onClick={() => {
          window.location.reload(false);
        }}
      >
        Main Menu
      </button>
    </div>
  );
};
export default Summary;
