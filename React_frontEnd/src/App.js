import Host from './HomePage_components/host'
import Join from './HomePage_components/join'
import HostWaiting from './WaitingPage_components/HostWaiting'
import PlayerWaiting from './WaitingPage_components/PlayerWaiting'
import TheGame from './GameStart_components/TheGame'
function App() {
  return (
  <div>
    <Host />
    <Join />
    <HostWaiting/>
    <PlayerWaiting />
    <TheGame/>
  </div>);
}

export default App;
