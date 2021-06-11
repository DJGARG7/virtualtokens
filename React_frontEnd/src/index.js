import { io } from "socket.io-client";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
const socket = io("http://localhost:5000");
    socket.on("connect", () => {
      console.log(socket.id);
    });
ReactDOM.render(<App socket={socket}/>, document.getElementById("root"));
