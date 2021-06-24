import { useEffect, useState } from "react";
import Host from "./components/HomePage_components/Host";
import Join from "./components/HomePage_components/Join";
import HostWaiting from "./components/WaitingPage_components/HostWaiting";
import PlayerWaiting from "./components/WaitingPage_components/PlayerWaiting";
import "./style.css";
function App({ socket }) {
  const [gameId, setGameId] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.on("get-game-id", (id) => setGameId(id));
  }, []);

  const joinGameHandler = (enteredCode) => {
    localStorage.setItem("name", userName);
    setGameId(enteredCode);
  };

  const hostGameHandler = () => {
    setIsHost(true);
    localStorage.setItem("name", userName);
    socket.emit("create-game", userName);
  };

  return (
    <div className="partMain">
      {gameId === null ? (
        <div>
          <form>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder={userName}
              onBlur={(e) => setUserName(e.target.value)}
              className="input"
              required
            />
          </form>
          <Host OnHosted={hostGameHandler} />
          <Join
            OnJoined={joinGameHandler}
            socket={socket}
            userName={userName}
          />
        </div>
      ) : (
        <div>
          <p>My Name: {userName} </p>
          {isHost ? (
            <HostWaiting gameCode={gameId} isHost={isHost} socket={socket} />
          ) : (
            <div className="parts">
              <PlayerWaiting gameCode={gameId} socket={socket} />
            </div>
          )}
        </div>
      )}
      Developed by:
      <div className="developers">
        <div>
          <p>Dhananjay Garg</p>
          <p>
            <a href="https://github.com/DJGARG7" target="_blank">
              GitHub
            </a>
          </p>
        </div>
        <div>
          <p>Dhruv Parekh</p>
          <p>
            <a href="https://github.com/dhruvparekh01" target="_blank">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
