// const { instrument } = require("@socket.io/admin-ui");
const generateUniqueId = require("generate-unique-id");
const games = {
  TPXWMJ: { socketid1: {name: "john", balance: 0}, socketid2: {name: "ram", balance: 0} },
  OAJHTI: { socketid3: {name: "raj", balance: 0}, socketid4: {name: "rohan", balance: 0} },
};

const io = require("socket.io")(5000, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("isHost", () => {
    const id = generateUniqueId({ length: 6, useNumbers: false });
    games[id.toUpperCase()]={};
    games[id.toUpperCase()].host = socket.id;

    // console.log(players);

    socket.emit("get-id", id.toUpperCase());
  });

  // Add a player
  socket.on("get-name", (name, id) => {
    if (!(id in games)) 
      return;
    
    games[id][socket.id] = {};
    games[id][socket.id].name=name;
    games[id][socket.id].balance=0;
    socket.to(games[id].host).emit("get-list",games[id]);
    console.log(games);
  });

  socket.on("add-balance", (gameID, playerID, amount) => {
    games[gameID][playerID].balance = amount;
    socket.to(playerID).emit("updated-balance",amount);
    console.log(games[gameID])
  });

  socket.on("checker", (enteredCode, cb) => {
    cb(enteredCode in games);
  });
});


function balanceChanged(socket, gameID, playerID) {
  socket.emit()
}

// socket.broadcast.emit("rec", number);
// socket.on("join-room", () => {
//   socket.join("hello");
// });

// do something about delete socket:name once client disconnect
// do something about delete code: {...}   if host disconnect
//render player list and what to do about balance management??

// instrument(io, { auth: false });

/*
socket.io fucntions
io.emit   this emits it to everyone connected

socket.emit only to the sender conection

socket.broadcast.emit everyone except itself


*/
