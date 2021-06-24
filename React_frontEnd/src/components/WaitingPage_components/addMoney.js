import { useEffect, useState } from "react";
const AddMoney = ({ player, socket, gameId }) => {
  const [balance, setBalance] = useState(0);
  const [textBoxVal, setTextBoxVal] = useState(0);

  useEffect(() => {
    console.log(balance);
    socket.emit("add-balance-for-player", gameId, player.playerID, balance);
  }, [balance]);

  const submitHandler = (event, bal) => {
    event.preventDefault();
    setBalance(parseInt(bal) + parseInt(textBoxVal));
  };

  return (
    <div className="playerList">
      <td>
        <div className="playerNameLobby"> {player.playerName}</div>
      </td>
      <div className="addMoneyStyle">
        <td>Current Bal : {balance}</td>
        <td>
          <form onSubmit={(e) => submitHandler(e, balance)}>
            <input
              type="number"
              placeholder="enter amount"
              onBlur={(e) => setTextBoxVal(e.target.value)}
              className="inputAdd"
              min={-1 * balance}
            ></input>
            <button className="buttonAdd">
              <td>add</td>
            </button>
          </form>
        </td>
      </div>
    </div>
  );
};
export default AddMoney;
