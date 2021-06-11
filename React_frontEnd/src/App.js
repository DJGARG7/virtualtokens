// import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Host from "./components/HomePage_components/host";
import Join from "./components/HomePage_components/join";
import HostWaiting from "./components/WaitingPage_components/HostWaiting";
import PlayerWaiting from "./components/WaitingPage_components/PlayerWaiting";

function App(props) {
  const [gameCode, setGameCode] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [isHost, setIsHost] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    gameCode !== null && props.socket.emit("get-name", userName, gameCode);
  }, [gameCode]);
  // isHost && props.socket.emit("isHost");

  // isHost && socket.emit("get-name",userName,gameCode)
  props.socket.on("get-id", (id) => {
    console.log("get id wali", id);
    setGameCode(id);
  });
  // socket.emit('join-room','hello')

  const userNameHandler = (event) => {
    setUserName(event.target.value);
  };
  const joiningHandler = (enteredCode) => {
    localStorage.setItem("name", userName);
    enteredCode !== "ERROR" && setGameCode(enteredCode);
    enteredCode === "ERROR" && setIsError(true);
  };

  const hostingHandler = () => {
    setIsHost(true);
    localStorage.setItem("name", userName);
    props.socket.emit("isHost");
  };
  return (
    <div className="parts">
      {gameCode === null ? (
        <div>
          <form>
            <input
              type="text"
              placeholder={userName}
              onBlur={userNameHandler}
            ></input>
          </form>
          <Host Hosted={hostingHandler} />
          <Join Joined={joiningHandler} socket={props.socket} />
          {isError && <p>Game Not Found!! Try Again</p>}
        </div>
      ) : (
        <div>
          <p>My Name: {userName} </p>
          {isHost ? (
            <HostWaiting
              gameCode={gameCode}
              ishost={isHost}
              socket={props.socket}
            />
          ) : (
            <PlayerWaiting gameCode={gameCode} socket={props.socket} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
