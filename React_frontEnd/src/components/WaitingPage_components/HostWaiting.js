import "./style.css";
const HostWaiting = () => {
  const roomid = "QDSTJU";
  const playerNames = [{name:"pranav", bal:400}, {name:"dhairya" ,bal:200}, {name:"dhananjay", bal:500}];

  return (
    <div className="parts">
      <div>Room Created Sucessfully</div>
      <div>
        <button>Start the Game</button>
      </div>
      <div>Game ID: {roomid}</div>
      <div>Share this with your friends</div>
      <div>Player List in lobby</div>
      {/* <div>{playerNames.map((name1, index) => ({ name1 }))}</div> */}
      <div>
        <div className="flex">
          {playerNames[0].name}
          <form>
            <input type="number" placeholder="enter amount"></input>
          </form>
          <button>add</button>
          Current Bal : {playerNames[0].bal}
        </div>
        <div className="flex">
          {playerNames[1].name}
          <form>
            <input type="number" placeholder="enter amount"></input>
          </form>
          <button>add</button>
          Current Bal : {playerNames[1].bal}
        </div>
        <div className="flex">
          {playerNames[2].name}
          <form>
            <input type="number" placeholder="enter amount"></input>
          </form>
          <button>add</button>
          Current Bal : {playerNames[2].bal}
        </div>
      </div>
    </div>
  );
};

export default HostWaiting;
