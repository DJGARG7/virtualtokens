import "./style.css";
import { useState } from "react";
const Join = (props) => {
  const [enteredCode, setEnteredCode] = useState("");
  const enteredCodeHandler = (event) => {
    setEnteredCode(event.target.value);
  };
  const joiningClickHandler = (event) => {
    event.preventDefault();
    props.socket.emit("checker", enteredCode, (flag) => {
      flag ? props.Joined(enteredCode) : props.Joined("ERROR");
    });
  };
  return (
    <div className="parts">
      <div>Join a Game</div>
      <div>Enter Room Id</div>
      <form>
        <input type="text" onBlur={enteredCodeHandler}></input>
        <button onClick={joiningClickHandler}>Join</button>
      </form>
    </div>
  );
};
export default Join;
