import { io } from "socket.io-client";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// const socket = io("http://10.0.0.237:5000");
// const socket = io("http://192.168.29.231:5000");
// const socket = io("http://localhost:5000");

const socket = io("https://gamble-backend.herokuapp.com");
socket.on("connect", () => {
  console.log(socket.id);
});
ReactDOM.render(<App socket={socket} />, document.getElementById("root"));
