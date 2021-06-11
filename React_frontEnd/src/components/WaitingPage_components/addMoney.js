import { useState } from "react";
const AddMoney = (props) => {
  const [addMoney, setAddMoney] = useState(0);
  const [money, setMoney] = useState(0);
  const moneyHandler = (event) => {
    setMoney(event.target.value);
  };
  const addHandler = (bal) => {
    setAddMoney(parseInt(bal) + parseInt(money));
  };
  return (
    <div className="flex">
      {props.player.name}
      <form>
        <input
          type="number"
          placeholder="enter amount"
          onBlur={moneyHandler}
        ></input>
      </form>
      <button onClick={() => addHandler(addMoney)}>add</button>
      Current Bal : {addMoney}
    </div>
  );
};
export default AddMoney;
