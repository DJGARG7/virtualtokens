import { useEffect, useState } from "react";
const AddMoney = ({player, socket, gameId}) => {
  const [balance, setBalance] = useState(0);
  const [money, setMoney] = useState(0);
  const moneyHandler = (event) => {
    setMoney(event.target.value);
  };

  useEffect(() => socket.emit("add-balance", gameId, player.id, balance), [balance, gameId, player] );

  const addHandler = (bal) => {
    setBalance(parseInt(bal) + parseInt(money));
  };
  // socket emit the balance {addMoney} to the particular player
  return (
    <div className="flex">
      {player.name}
      <form>
        <input
          type="number"
          placeholder="enter amount"
          onBlur={moneyHandler}
        ></input>
      </form>
      <button onClick={() => addHandler(balance)}>add</button>
      Current Bal : {balance}
    </div>
  );
};
export default AddMoney;
