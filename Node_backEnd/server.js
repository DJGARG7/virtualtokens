const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:3000","http://localhost:8080", "https://admin.socket.io"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("custom-event", (number) => {
    socket.broadcast.emit("rec", number);
  });
  // socket.on('join-room',()=>{
  //     socket.join('hello')
  // })
});

instrument(io, { auth: false });
