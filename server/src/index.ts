import http from "http";
import { Server } from "socket.io";

const PORT = 5000;

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(PORT, () => {
  console.log("Server listenning on port 5000...");
});

let readyPlayers = 0;

io.on("connection", (socket) => {
  socket.on("ready", () => {
    console.log(`Player is ready ${socket.id}`);
    readyPlayers++;
    if (readyPlayers === 2) {
      console.log("2 players are ready");
      io.emit("gameStart", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData: { xPosition: number }) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
});
