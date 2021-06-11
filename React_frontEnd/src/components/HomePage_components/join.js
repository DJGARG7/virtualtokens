import "./style.css";
import { useState } from "react";
const Join = (props) => {
  const [enteredCode, setEnteredCode] = useState("");
  const enteredCodeHandler = (event) => {
    setEnteredCode(event.target.value);
  };
  const joiningClickHandler = (event) => {
    event.preventDefault();
    console.log(enteredCode);

    //check if such a code does not exist in node.js maintained codeArray
    // replace the condition with false

    false ? props.Joined("ERROR") : props.Joined(enteredCode);
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
