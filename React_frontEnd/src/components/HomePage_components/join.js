import { useEffect, useState } from "react";
const Join = ({ OnJoined, socket, userName }) => {
  const [enteredCode, setEnteredCode] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    socket.on("join-status", (joinStatus, gameID) => {
      if (!joinStatus) {
        setIsError(!joinStatus);
        return;
      }

      OnJoined(gameID);
    });
  }, []);

  const joiningClickHandler = (event) => {
    event.preventDefault();
    socket.emit("join-game", enteredCode.toUpperCase(), userName);
  };

  return (
    <div className="parts">
      <div>Join a Game</div>
      <form onSubmit={joiningClickHandler}>
        <label>Enter Room Id</label>
        <input
          className="input"
          maxLength="4"
          minLength="4"
          type="text"
          onBlur={(e) => setEnteredCode(e.target.value)}
          required
        />
        <button className="button">Join</button>
      </form>
      {isError && <p>Game Not Found or Already Started</p>}
    </div>
  );
};
export default Join;
