import { useState, useEffect } from "react";

const ChildTry = ({ parent, balance, socket, gameID }) => {
  const [bet, setBet] = useState(0);
  const [myBalance, setMyBalance] = useState(balance);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    socket.on("game-state", (game, message, rank, dis) => {
      if (rank === 1) {
        setMyBalance((prevState) => game.players[socket.id].balance);
        setDisabled(dis);
      }
      if (rank === 2) {
        setDisabled(dis);
      }
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    socket.emit("add-to-table", bet, gameID);
    setMyBalance((prevState) => prevState - bet);
  };

  return (
    <div>
      <div>My Balance</div>
      <div>{myBalance}</div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          className="input"
          placeholder="Enter Bet Amount"
          min="1"
          max={myBalance}
          onBlur={(e) => setBet(e.target.value)}
        />
        <button className="button" type="submit" disabled={disabled}>
          Add to table
        </button>
      </form>
    </div>
  );
};
export default ChildTry;
