const { instrument } = require("@socket.io/admin-ui");
const generateUniqueId = require("generate-unique-id");
const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 5000;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

function generateGameID() {
  return generateUniqueId({
    length: 4,
    useNumbers: false,
  }).toUpperCase();
}

const games = {};
const playerList = {};

function broadcastGameState(socket, game, message,rank,dis) {
  console.log("Game state broadcasdted");
  socket.emit("game-state", game, message,rank,dis);

  socket.to(game.gameID).emit("game-state", game, message,rank,dis);
}

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("create-game", (playerName) => {
    const player = {
      playerID: socket.id,
      isHost: true,
      balance: parseInt(0),
      playerName: playerName,
    };
    const gameID = generateGameID();

    const game = {
      gameID: gameID,
      hostID: socket.id,
      players: { [socket.id]: player },
      tableBalance: parseInt(0),
      gameStarted: false,
    };

    games[gameID] = game;

    playerList[socket.id] = game.gameID;

    socket.join(gameID);

    socket.emit("get-game-id", game.gameID);
  });

  socket.on("join-game", (gameID, playerName) => {
    if (!(gameID in games)) {
      socket.emit("join-status", false, "ERR");
      return;
    }

    const player = {
      playerID: socket.id,
      isHost: false,
      balance: parseInt(0),
      playerName: playerName,
    };
    games[gameID].players[socket.id] = player;

    const game = games[gameID];
    socket.join(gameID);

    playerList[socket.id] = game.gameID;
    socket.emit("join-status", true, gameID);
    console.log("TEST");
    console.log({ game: game, message: "" });
    socket.to(game.hostID).emit("game-state", game, "",0);
  });

  socket.on("add-balance-for-player", (gameID, playerID, amount) => {
    if (!(gameID in games)) return;

    games[gameID].players[playerID].balance = parseInt(amount);
    const player = games[gameID].players[playerID];

    console.log(games[gameID]);

    player.isHost
      ? socket.emit("game-state", games[gameID], "",0)
      : socket.to(playerID).emit("game-state", games[gameID], "",0);
  });

  socket.on("start-game", (gameID) => {
    games[gameID].gameStarted = true;
    broadcastGameState(socket, games[gameID], "",0,false);
  });

  socket.on("add-to-table", (amount, gameID) => {
    const game = games[gameID];
    const player = game.players[socket.id];
    game.tableBalance += parseInt(amount);
    game.players[socket.id].balance -= parseInt(amount);

    const message = `${player.playerName} added ${amount} to the table`;

    broadcastGameState(socket, game, message,1,false);

    socket.id === games[gameID].hostID
      ? socket.emit("toggleBal")
      : socket.to(games[gameID].hostID).emit("toggleBal");
  });


  socket.on("get-player-list-for-end-round",(gameID,cb)=>{
      cb(games[gameID]);
      broadcastGameState(socket,games[gameID],"",1,true)
  })

  socket.on("end-round", (gameID, winnerList, winAmount) => {
    games[gameID].tableBalance=0
    winnerList.forEach((winnerID) => {
        games[gameID].players[winnerID].balance += winAmount;
    });
    console.log(games[gameID])

    broadcastGameState(socket, games[gameID], "Round ended",1,false);
  });
  socket.on("close-modal",(gameID)=>{
      broadcastGameState(socket,games[gameID],"",2,false)
  })

  socket.on("game-ended",(gameID)=>{
    socket.emit("display-summary",games[gameID])
    socket.to(gameID).emit("display-summary",games[gameID])
  })
  socket.on("get-summary-data",(gameID,cb)=>{
    cb(games[gameID])
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected with id: ", socket.id);
    if (typeof games[playerList[socket.id]] !== "undefined") {
      games[playerList[socket.id]].host === socket.id
        ? delete games[playerList[socket.id]]
        : delete games[playerList[socket.id]][socket.id];
    }
    delete playerList[socket.id];
  });
});

instrument(io, { auth: false });
