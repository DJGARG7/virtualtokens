import { io } from "socket.io-client";
import Host from "./components/HomePage_components/host";

// import Join from './components/HomePage_components/join'
// import HostWaiting from './components/WaitingPage_components/HostWaiting'
// import PlayerWaiting from './components/WaitingPage_components/PlayerWaiting'
// import TheGame from './components/GameStart_components/TheGame'

function App() {
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log(socket.id);
  });


  // socket.on("rec", (number) => {
  //   console.log(number);
  // });

  // socket.emit("custom-event", 10);
  // socket.emit('join-room','hello')
  console.log("heuiwibefier")
  setTimeout(()=>console.log("hello"),2000)
  return (
    <div>
      <div className="parts">
        {/* <Host /> */}
        {/* <Join /> */}
        {/* </div>
        <HostWaiting/>
        <PlayerWaiting />
        <TheGame/>
        </div> */}
        bhaiiiii
      </div>
    </div>
  );
}
export default App;
