import Modal from "./Modal";
import { useEffect, useState } from "react";
const HostControls = ({ socket, gameId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [players, setPlayerList] = useState({
    names: [],
    TableBal: 0,
  });
  const [toggle, setToggle] = useState(true);
  const [winners, setWinners] = useState({});
  useEffect(() => {
    socket.on("toggleBal", () => {
      setToggle(false);
    });
  }, []);
  const endRoundHandler = () => {
    let playerList = [];
    socket.emit("get-player-list-for-end-round", gameId, (game) => {
      Object.keys(game.players).forEach((key) => {
        var player = {};
        player[key] = game.players[key].playerName;
        playerList.push(player);
      });

      setPlayerList({
        names: playerList,
        TableBal: game.tableBalance,
      });
      setIsOpen(true);
    });
  };

  //end game and generate summary
  // this option should only be available after round end ...by that i mean whenever table balance is zero...
  //this option should basically end game for all and display last balance of each player
  // const endGameHandler = () => {
  //   setIsOpen(true);
  //   console.log("pressed");
  // };
  const submitHandler = (event) => {
    let winAmount = 0;
    event.preventDefault();

    var winObj = winners;
    var winnerList = [];
    Object.keys(winObj).forEach((playerId) => {
      winObj[playerId] === true && winnerList.push(playerId);
    });

    if (winnerList.length !== 0) {
      setIsOpen(false);

      winAmount = Math.floor(players.TableBal / winnerList.length);
      socket.emit("end-round", gameId, winnerList, winAmount);
      setToggle(true);
    }
    setWinners({});
  };
  const checkedHandler = (event) => {
    setWinners((prevState) => {
      return {
        ...prevState,
        [event.target.defaultValue]: event.target.checked,
      };
    });
  };

  const closeHandler = () => {
    setIsOpen(false);
    socket.emit("close-modal", gameId);
  };

  const endGameHandler=()=>{
    socket.emit("game-ended",gameId);
  }
  return (
    <div>
      <button className="button" onClick={endRoundHandler} disabled={toggle}>
        End Round
      </button>
      <Modal open={isOpen} onClose={closeHandler}>
        <form onSubmit={submitHandler}>
          {players.names.map((pp) => (
            <div>
              <label className="container">
                {pp[Object.keys(pp)[0]]}
                <input
                  type="checkbox"
                  id={Object.keys(pp)[0]}
                  name={Object.keys(pp)[0]}
                  value={Object.keys(pp)[0]}
                  onChange={checkedHandler}
                />
                <span className="checkmark" />
              </label>
            </div>
          ))}

          <input type="submit" className="button" value="Submit" />
        </form>
      </Modal>
      <button className="button" onClick={endGameHandler} disabled={!toggle}>
        End Game and Generate a Summary
      </button>
    </div>
  );
};
export default HostControls;
