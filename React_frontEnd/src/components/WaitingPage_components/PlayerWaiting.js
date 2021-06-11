import "./style.css";
const PlayerWaiting = () => {
  const roomid = "QDSTJU";
  const myName = "pranav";
  const myBalance = 400;
  return (
    <div className="parts">
      <div>Game ID: {roomid}</div>
      <div>Share this with your friends</div>
      <div>
        <div>My name :{myName}</div>
        <div>My Balance :{myBalance}</div>
        <div>Waiting for host to start the game</div>
      </div>
    </div>
  );
};

export default PlayerWaiting;
