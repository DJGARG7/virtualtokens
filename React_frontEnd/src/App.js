// import { io } from "socket.io-client";
import { useState } from "react";
import Host from "./components/HomePage_components/host";
import Join from "./components/HomePage_components/join";
import HostWaiting from "./components/WaitingPage_components/HostWaiting";
import PlayerWaiting from "./components/WaitingPage_components/PlayerWaiting";

function App() {
  const [gameCode, setGameCode] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [isHost, setIsHost] = useState(false);
  const [isError, setIsError] = useState(false);
  {
    // const socket = io("http://localhost:5000");
    // socket.on("connect", () => {
    //   console.log(socket.id);
    // });
    // socket.on("rec", (number) => {
    //   console.log(number);
    // });
    // socket.emit("custom-event", 10);
    // socket.emit('join-room','hello')
  }
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
    //write code for connection with socket,,, socket returns socket.id and room code
    //push that code in node.js maintained codeArray
    //also enter the host to the room created
    // right now taking dummy value of code
    setGameCode("AWQS");
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
          <Join Joined={joiningHandler} />
          {isError && <p>Game Not Found!! Try Again</p>}
        </div>
      ) : (
        <div>
          <p>My Name: {userName} </p>
          {isHost ? (
            <HostWaiting gameCode={gameCode} ishost={isHost} />
          ) : (
            <PlayerWaiting gameCode={gameCode} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
